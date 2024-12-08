using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Yachties.Server.Models;
using Yachties.Server.Data;

namespace Yachties.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Yacht> Yachts { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data for yachts
            modelBuilder.Entity<Yacht>().HasData(
                new Yacht { Id = 1, Name = "Sea Breeze", Description = "Comfortable 30ft yacht", Capacity = 6, PricePerDay = 300 },
                new Yacht { Id = 2, Name = "Ocean Star", Description = "Luxurious 40ft yacht", Capacity = 8, PricePerDay = 500 },
                new Yacht { Id = 3, Name = "Sunset Cruiser", Description = "Family-friendly 35ft yacht", Capacity = 7, PricePerDay = 400 },
                new Yacht { Id = 4, Name = "Wind Dancer", Description = "Sporty 28ft yacht", Capacity = 4, PricePerDay = 250 },
                new Yacht { Id = 5, Name = "Island Hopper", Description = "Versatile 38ft yacht", Capacity = 8, PricePerDay = 450 },
                new Yacht { Id = 6, Name = "Blue Horizon", Description = "Elegant 45ft yacht", Capacity = 10, PricePerDay = 600 }
            );
        }
    }
}