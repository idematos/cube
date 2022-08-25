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

    public string MalformedLineMessage = "Found malformed line with fewer characters than expected.";
    public string InvalidTypeIdMessage = "Found invalid transaction type id";
    public string TypeIdNotFoundMessage = "Could not find a valid transacion type with the given type id.";
    public string InvalidTransactionValueMessage = "Found invalid transaction value.";

    public List<Transaction> ParseTransactions(IEnumerable<string> transactionList)
    {
        var transactions = _context.Transactions.ToList();
        var transactionTypes = _context.TransactionTypes.ToList();

        var parsedTransactions = transactionList.Select(t =>
        {
            if (t.Length < 67)
                throw new ArgumentException(MalformedLineMessage);

            if (!int.TryParse(t[0].ToString(), out int typeId))
                throw new ArgumentException(InvalidTypeIdMessage);

            var type = transactionTypes.Where(tt => tt.Id == typeId).SingleOrDefault();
            if (type == null)
                throw new ArgumentException(TypeIdNotFoundMessage);

            var date = DateTime.Parse(t[1..25], CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind).ToUniversalTime();

            var productDescription = t[26..55].Trim();

            if (!decimal.TryParse(t[56..65], out decimal value))
                throw new ArgumentException(InvalidTransactionValueMessage);

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

        return parsedTransactions;
    }
}