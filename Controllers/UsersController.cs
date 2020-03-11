
using System.Threading.Tasks;
using FantasyStockTracker.Application;
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

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDTO>> Register(UserRegisterDTO userRegisterDTO){
            var registeredUserDTO = await _usersApp.Register(userRegisterDTO);
            if(registeredUserDTO.Message != null){
                return BadRequest(registeredUserDTO.Message);
            }
            return Created("", registeredUserDTO);
        }
    }
}