using System.ComponentModel.DataAnnotations;

namespace FantasyStockTracker.Models.DTOs
{
    public class UserDTO
    {
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }

        public string Message {get;set;}
    }
}