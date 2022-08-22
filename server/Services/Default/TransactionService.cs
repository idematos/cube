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

    public void ParseTransactions(IEnumerable<string> transactions)
    {
        var transaction_types = _context.TransactionTypes.ToList();

        var parsed_transactions = transactions.Select(t =>
        {
            if (t.Length < 67) throw new ArgumentException($"Found malformed line with only {t.Length} characters.");

            if (!int.TryParse(t[0].ToString(), out int typeId))
                throw new ArgumentException("First character is not a valid transaction type id.");

            var type = transaction_types.Where(tt => tt.Id == typeId).SingleOrDefault();
            if (type == null) throw new ArgumentException($"Could not find a valid transacion type with id {t[0]}");

            var date = DateTime.Parse(t[1..25], CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind).ToUniversalTime();

            var productDescription = t[26..55].Trim();

            if (!decimal.TryParse(t[56..65], out decimal value))
                throw new ArgumentException("Transaction value is not a valid number.");

            var sellerName = t[66..].Trim();

            return new Transaction(type, date, productDescription, value / 100, sellerName);
        }).ToList();

        _context.Transactions.UpdateRange(parsed_transactions);
        _context.SaveChanges();
    }
}