
using System.Threading.Tasks;
using FantasyStockTracker.Application.interfaces;
using FantasyStockTracker.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FantasyStockTracker.Controllers
{
    public class UsersController : BaseController
    {
        private readonly IUsersApp _usersApp;

        public UsersController(IUsersApp usersApp)
        {
            _usersApp = usersApp;
        }

        //POST api/users/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDTO>> Login(UserLoginDTO userLoginDTO)
        {
            var loggedInUser = await _usersApp.Login(userLoginDTO);
            if (loggedInUser == null)
            {
                return NotFound();
            }
            return loggedInUser;
        }

        //POST api/users/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDTO>> Register(UserRegisterDTO userRegisterDTO)
        {
            var registeredUserDTO = await _usersApp.Register(userRegisterDTO);
            if (registeredUserDTO.Message.Count > 0)
            {
                return BadRequest(registeredUserDTO.Message);
            }
            return Created("", registeredUserDTO);
        }
    }
}