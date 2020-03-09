using Microsoft.AspNetCore.Identity;

namespace FantasyStockTracker.Models
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}