using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Versta.Application.Dto;
using Versta.Application.Interfaces;

namespace Versta.Api.Endpoints;

public static class OrdersEndpoints
{
    public static void MapOrdersEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/orders").WithTags("Orders");

        group.MapGet("", async Task<Results<Ok<IReadOnlyList<OrderDto>>, InternalServerError<string>>>(IOrderService orders, CancellationToken ct) =>
        {
            try
            {
                var list = await orders.GetAllAsync(ct);
                return TypedResults.Ok(list);
            }
            catch (Exception ex)
            {
                return TypedResults.InternalServerError(ex.Message);
            }
        });

        group.MapGet("{id:int}", async Task<Results<Ok<OrderDto>, NotFound>> (int id, IOrderService orders, CancellationToken ct) =>
        {
            var order = await orders.GetByIdAsync(id, ct);
            return order is null ? TypedResults.NotFound() : TypedResults.Ok(order);
        });

        group.MapPost("", async Task<Results<Created<OrderDto>, BadRequest<string>, InternalServerError<string>>> (
            [FromBody] CreateOrderDto request,
            IOrderService orders,
            CancellationToken ct) =>
        {
            try
            {
                var created = await orders.CreateAsync(request, ct);
                return TypedResults.Created($"/api/orders/{created.Id}", created);
            }
            catch (ArgumentException ex)
            {
                return TypedResults.BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return TypedResults.InternalServerError(ex.Message);
            }
        });
    }
}
