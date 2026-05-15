namespace Versta.Domain.Entities;

public class Order
{
    public int Id { get; set; }
    public string? OrderNumber { get; set; }
    public required string SenderCity { get; set; }
    public required string SenderAddress { get; set; }
    public required string RecipientCity { get; set; }
    public required string RecipientAddress { get; set; }
    public double Weight { get; set; }
    public DateOnly PickupDate { get; set; }
}
