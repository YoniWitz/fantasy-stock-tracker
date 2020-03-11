using System.ComponentModel.DataAnnotations;

namespace FantasyStockTracker.Models.DTOs
{
    public class UserRegisterDTO
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]

        public string Password { get; set; }

    }
}