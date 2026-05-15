using Versta.Application.Dto;
using Versta.Domain.Entities;

namespace Versta.Application.Mapping;

public static class OrderMapping
{
    public static OrderDto ToDto(this Order order) => new(
        order.Id,
        order.OrderNumber ?? string.Empty,
        order.SenderCity,
        order.SenderAddress,
        order.RecipientCity,
        order.RecipientAddress,
        order.Weight,
        order.PickupDate);
}
