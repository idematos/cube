namespace Cube.Models;

public class Transaction : IEquatable<Transaction>
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

    public void Update(Transaction other)
    {
        Type = other.Type;
        Date = other.Date;
        ProductDescription = other.ProductDescription;
        Value = other.Value;
        SellerName = other.SellerName;
    }

    public bool Equals(Transaction? other) => other != null &&
        Type.Id == other.Type.Id &&
        Date.CompareTo(other.Date) == 0 &&
        ProductDescription == other.ProductDescription &&
        Value == other.Value &&
        SellerName == other.SellerName;

    public override bool Equals(object? other) => Equals(other as Transaction);

    public override int GetHashCode() => (Date, ProductDescription, Value, SellerName).GetHashCode();

}