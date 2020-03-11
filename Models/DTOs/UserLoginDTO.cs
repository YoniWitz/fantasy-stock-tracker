using System.ComponentModel.DataAnnotations;

namespace FantasyStockTracker.Models.DTOs
{
    public class UserLoginDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}