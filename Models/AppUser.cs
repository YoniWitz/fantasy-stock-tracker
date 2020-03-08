using Microsoft.AspNetCore.Identity;

namespace FantasyStockTracker.Models
{
    public class AppUser:IdentityUser
    {
        public string DisplayName {get;set;}
    }
}