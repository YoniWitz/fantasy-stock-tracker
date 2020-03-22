using System;

namespace FantasyStockTracker.Models
{
    public class Holding
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public User User { get; set; }
    }
}