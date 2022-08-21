using Microsoft.EntityFrameworkCore;

namespace Cube.Data;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions options) : base(options)
    { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(Config.ConnectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    { }
}