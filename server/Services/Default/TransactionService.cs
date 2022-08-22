using System.Globalization;
using Cube.Data;
using Cube.Models;

namespace Cube.Services.Default;

public class TransactionService : ITransactionService
{
    private readonly ApplicationContext _context;

    public TransactionService(ApplicationContext context)
    {
        _context = context;
    }

    public void ParseTransactions(IEnumerable<string> transactionList)
    {
        var transactions = _context.Transactions.ToList();
        var transactionTypes = _context.TransactionTypes.ToList();

        var parsedTransactions = transactionList.Select(t =>
        {
            if (t.Length < 67)
                throw new ArgumentException($"Found malformed line with only {t.Length} characters.");

            if (!int.TryParse(t[0].ToString(), out int typeId))
                throw new ArgumentException("First character is not a valid transaction type id.");

            var type = transactionTypes.Where(tt => tt.Id == typeId).SingleOrDefault();
            if (type == null)
                throw new ArgumentException($"Could not find a valid transacion type with id {t[0]}");

            var date = DateTime.Parse(t[1..25], CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind).ToUniversalTime();

            var productDescription = t[26..55].Trim();

            if (!decimal.TryParse(t[56..65], out decimal value))
                throw new ArgumentException("Transaction value is not a valid number.");

            var sellerName = t[66..].Trim();

            return new Transaction(type, date, productDescription, value / 100, sellerName);
        }).ToList();

        foreach (var parsedTransaction in parsedTransactions)
        {
            var existing = transactions.SingleOrDefault(t => t.Equals(parsedTransaction));
            if (existing != null)
                existing.Update(parsedTransaction);
            else
                transactions.Add(parsedTransaction);
        }

        _context.Transactions.UpdateRange(transactions);
        _context.SaveChanges();
    }
}