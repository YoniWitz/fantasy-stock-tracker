using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FantasyStockTracker.Application.interfaces;
using FantasyStockTracker.Models;
using FantasyStockTracker.Models.DTOs;
using FantasyStockTracker.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FantasyStockTracker.Application
{
    public class UsersApp : IUsersApp
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UsersApp(IHttpContextAccessor httpContextAccessor, DataContext context, UserManager<User> userManager, SignInManager<User> signInManager, IJwtGenerator jwtGenerator)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<UserDTO> Login(UserLoginDTO userLoginDTO)
        {
            var user = await _userManager.FindByEmailAsync(userLoginDTO.Email);

            var userResult = await _signInManager.CheckPasswordSignInAsync(user, userLoginDTO.Password, false);

            if (userResult.Succeeded)
            {
                return new UserDTO
                {
                    DisplayName = user.DisplayName,
                    Token = _jwtGenerator.CreateToken(user),
                    UserName = user.UserName
                };
            }
            return null;
        }

        public async Task<UserDTO> Register(UserRegisterDTO userRegisterDTO)
        {
            var userDTO = new UserDTO();
            if (await _context.Users.Where(x => x.Email == userRegisterDTO.Email).AnyAsync())
            {
                userDTO.Message.Add("Email already exists in system");
            }

            var newUser = new User
            {
                DisplayName = userRegisterDTO.DisplayName,
                Email = userRegisterDTO.Email,
                UserName = userRegisterDTO.UserName,
            };

            var newUserResult = await _userManager.CreateAsync(newUser, userRegisterDTO.Password);

            if (newUserResult.Succeeded)
            {
                userDTO.DisplayName = newUser.DisplayName;
                userDTO.UserName = newUser.UserName;
                userDTO.Token = _jwtGenerator.CreateToken(newUser);
            }
            else
            {
                foreach (var Error in newUserResult.Errors)
                    userDTO.Message.Add(Error.Description);
            }
            return userDTO;
        }

        public string GetCurrentUsername()
        {
            var username = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return username;
        }

        private static UserDTO UserToDTO(User user) =>
             new UserDTO
             {
                 //  Email = user.Email
             };

        private bool _disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _userManager.Dispose();
                    //_signInManager.Dispose();
                }
            }
            _disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}