
using System;
using FantasyStockTracker.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FantasyStockTracker.Persistence
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Holding> Holdings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // modelBuilder.Entity<Holding>()
            // .HasData(
            //     new Holding { Id = Guid.NewGuid(), Name = "Value 101" },
            //     new Holding { Id = Guid.NewGuid(), Name = "Value 202" },
            //     new Holding { Id = Guid.NewGuid(), Name = "Value 303" }
            // );

            builder.Entity<Holding>()
                .HasOne(e => e.User)
                .WithMany(c => c.Holdings)
                .IsRequired();
        }
    }
}