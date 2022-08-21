namespace Cube.Models;

public class Transaction
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string ProductDescription { get; set; }
    public decimal Value { get; set; }
    public string SellerName { get; set; }

    public int TypeId { get; set; }
    public TransactionType Type { get; set; }

    private Transaction()
    {
        ProductDescription = default!;
        SellerName = default!;
        Type = default!;
    }

    public Transaction(TransactionType type, DateTime date, string productDescription, decimal value, string sellerName)
    {
        (Type, Date, ProductDescription, Value, SellerName) = (type, date, productDescription, value, sellerName);
    }
}