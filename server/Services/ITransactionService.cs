using Cube.Models;

namespace Cube.Services;

public interface ITransactionService
{
    List<Transaction> ParseTransactions(IEnumerable<string> transactions);
}