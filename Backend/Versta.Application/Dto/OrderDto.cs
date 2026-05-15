namespace Versta.Application.Dto;

public sealed record OrderDto(
    int Id,
    string OrderNumber,
    string SenderCity,
    string SenderAddress,
    string RecipientCity,
    string RecipientAddress,
    double Weight,
    DateOnly PickupDate);
