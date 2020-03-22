using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace FantasyStockTracker.Models
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }
        public ICollection<Holding> Holdings { get; set; }
    }
}