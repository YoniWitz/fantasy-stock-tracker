
using FantasyStockTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace FantasyStockTracker.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Holding> Holdings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Holding>()
            .HasData(
                new Holding { Id = 1, Name = "Value 101" },
                new Holding { Id = 2, Name = "Value 202" },
                new Holding { Id = 3, Name = "Value 303" }
            );
        }
    }
}