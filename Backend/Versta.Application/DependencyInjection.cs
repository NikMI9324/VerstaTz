using Microsoft.Extensions.DependencyInjection;
using Versta.Application.Interfaces;
using Versta.Application.Services;

namespace Versta.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IOrderService, OrderService>();
        return services;
    }
}
