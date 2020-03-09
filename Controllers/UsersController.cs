
using System.Threading.Tasks;
using FantasyStockTracker.Application;
using FantasyStockTracker.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FantasyStockTracker.Controllers
{
    public class UsersController : BaseController
    {
        private readonly UsersApp _usersApp;

        public UsersController(UsersApp usersApp)
        {
            _usersApp = usersApp;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(UserDTO userDTO)
        {
            var loggedInUser = await _usersApp.Login(userDTO);
            if (loggedInUser == null)
            {
                return NotFound();
            }
            return loggedInUser;
        }
    }
}