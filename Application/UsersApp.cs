using System;
using System.Threading.Tasks;
using FantasyStockTracker.Application.interfaces;
using FantasyStockTracker.Models;
using FantasyStockTracker.Models.DTOs;
using Microsoft.AspNetCore.Identity;

namespace FantasyStockTracker.Application
{
    public class UsersApp : IUsersApp
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        public UsersApp(UserManager<User> userManager, SignInManager<User> signInManager, IJwtGenerator jwtGenerator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<UserDTO> Login(UserDTO userDto)
        {
            var user = await _userManager.FindByEmailAsync(userDto.Email);

            var result = await _signInManager.CheckPasswordSignInAsync(user, userDto.Password, false);

            if (result.Succeeded)
            {
                return new UserDTO
                {
                    DisplayName = user.DisplayName,
                    Token = _jwtGenerator.CreateToken(user),
                    UserName = user.UserName,
                    Image = null
                };
            }
            return null;
        }

        private static UserDTO UserToDTO(User user) =>
             new UserDTO
             {
                 Email = user.Email
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