namespace Cube.Services;

public interface ITransactionService
{
    void ParseTransactions(IEnumerable<string> transactions);
}