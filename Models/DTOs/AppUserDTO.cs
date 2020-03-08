using System.ComponentModel.DataAnnotations;

namespace FantasyStockTracker.Models.DTOs
{
    public class AppUserDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}