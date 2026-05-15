using Versta.Application.Dto;
using Versta.Application.Interfaces;
using Versta.Application.Mapping;
using Versta.Domain.Interfaces;
using Versta.Domain.Entities;

namespace Versta.Application.Services;

public sealed class OrderService(IOrderRepository orders) : IOrderService
{
    public async Task<OrderDto> CreateAsync(CreateOrderDto request, CancellationToken cancellationToken = default)
    {
        Validate(request);

        var order = new Order
        {
            SenderCity = request.SenderCity.Trim(),
            SenderAddress = request.SenderAddress.Trim(),
            RecipientCity = request.RecipientCity.Trim(),
            RecipientAddress = request.RecipientAddress.Trim(),
            Weight = request.Weight,
            PickupDate = request.PickupDate
        };

        await orders.AddAsync(order, cancellationToken);

        order.OrderNumber = $"{DateTime.UtcNow.Year}-{order.Id:D6}";
        await orders.SaveChangesAsync(cancellationToken);

        return order.ToDto();
    }

    public async Task<IReadOnlyList<OrderDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var list = await orders.GetAllAsync(cancellationToken);
        return list.Select(o => o.ToDto()).ToList();
    }

    public async Task<OrderDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var order = await orders.GetByIdAsync(id, cancellationToken);
        return order is null ? null : order.ToDto();
    }

    private static void Validate(CreateOrderDto request)
    {
        if (string.IsNullOrWhiteSpace(request.SenderCity))
            throw new ArgumentException("Город отправителя обязателен.", nameof(request));
        if (string.IsNullOrWhiteSpace(request.SenderAddress))
            throw new ArgumentException("Адрес отправителя обязателен.", nameof(request));
        if (string.IsNullOrWhiteSpace(request.RecipientCity))
            throw new ArgumentException("Город получателя обязателен.", nameof(request));
        if (string.IsNullOrWhiteSpace(request.RecipientAddress))
            throw new ArgumentException("Адрес получателя обязателен.", nameof(request));
        if (request.Weight <= 0)
            throw new ArgumentException("Введите адекватный вес груза.", nameof(request));
        if (request.PickupDate == default)
            throw new ArgumentException("Укажите дату забора груза.", nameof(request));
    }
}
