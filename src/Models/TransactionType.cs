namespace Cube.Models;

public enum TransactionNature
{
    INCOME,
    EXPENSE
}

public class TransactionType
{
    public int Id { get; set; }
    public string Description { get; set; }
    public TransactionNature Nature { get; set; }

    public List<Transaction> Transactions { get; set; } = default!;

    public TransactionType(string description, TransactionNature nature)
    {
        (Description, Nature) = (description, nature);
    }
}