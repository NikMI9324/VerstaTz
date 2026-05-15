using Microsoft.EntityFrameworkCore;
using Versta.Domain.Interfaces;
using Versta.Domain.Entities;
using Versta.Infrastructure.Data;

namespace Versta.Infrastructure.Repositories;

public sealed class OrderRepository(AppDbContext db) : IOrderRepository
{
    public async Task<Order> AddAsync(Order order, CancellationToken cancellationToken = default)
    {
        db.Orders.Add(order);
        await db.SaveChangesAsync(cancellationToken);
        return order;
    }

    public async Task<IReadOnlyList<Order>> GetAllAsync(CancellationToken cancellationToken = default) =>
        await db.Orders.AsNoTracking().OrderByDescending(o => o.Id).ToListAsync(cancellationToken);

    public async Task<Order?> GetByIdAsync(int id, CancellationToken cancellationToken = default) =>
        await db.Orders.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id, cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken = default) =>
        db.SaveChangesAsync(cancellationToken);
}
