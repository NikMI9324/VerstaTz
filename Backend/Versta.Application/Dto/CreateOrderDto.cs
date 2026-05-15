namespace Versta.Application.Dto;

public sealed record CreateOrderDto(
    string SenderCity,
    string SenderAddress,
    string RecipientCity,
    string RecipientAddress,
    double Weight,
    DateOnly PickupDate);
