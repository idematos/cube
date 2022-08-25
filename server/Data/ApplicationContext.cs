using Cube.Models;
using Microsoft.EntityFrameworkCore;

namespace Cube.Data;

public class ApplicationContext : DbContext
{
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<TransactionType> TransactionTypes => Set<TransactionType>();

    private bool _isTest = false;

    public ApplicationContext(DbContextOptions options, bool isTest) : base(options)
    {
        _isTest = isTest;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!_isTest)
            optionsBuilder.UseNpgsql(Config.ConnectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transaction>()
            .HasIndex(t => new { t.TypeId, t.Date, t.ProductDescription, t.Value, t.SellerName })
            .IsUnique();

        modelBuilder.Entity<TransactionType>().Property(tt => tt.Nature).HasConversion
        (
            v => v.ToString(),
            v => (TransactionNature)Enum.Parse(typeof(TransactionNature), v)
        );

        modelBuilder.Entity<TransactionType>().HasData(
            new TransactionType("Venda produtor", TransactionNature.INCOME) { Id = 1 },
            new TransactionType("Venda afiliado", TransactionNature.INCOME) { Id = 2 },
            new TransactionType("Comissão paga", TransactionNature.EXPENSE) { Id = 3 },
            new TransactionType("Comissão recebida", TransactionNature.INCOME) { Id = 4 }
        );
    }
}