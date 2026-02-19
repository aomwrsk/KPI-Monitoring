using Microsoft.EntityFrameworkCore;
using SalesMonitor.API.Models;

namespace SalesMonitor.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Quotation> Quotations { get; set; }
    // DashboardStats and others are calculated, not stored usually.
    // Or we store SalesData?
    // Start with core entities.

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Items is already marked [NotMapped] in the model
        
        // Configure decimal precision
        modelBuilder.Entity<Customer>().Property(c => c.TotalSpend).HasPrecision(18, 2);
        modelBuilder.Entity<Order>().Property(o => o.TotalAmount).HasPrecision(18, 2);
        modelBuilder.Entity<Quotation>().Property(q => q.TotalAmount).HasPrecision(18, 2);

        // Items are now [NotMapped] in the model to avoid issues with legacy tables
    }
}
