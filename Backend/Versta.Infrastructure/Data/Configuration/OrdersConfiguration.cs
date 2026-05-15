using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Versta.Domain.Entities;

namespace Versta.Infrastructure.Data.Configuration;

public class OrdersConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders");
        builder.HasKey(o => o.Id);
        builder.Property(o => o.Id).ValueGeneratedOnAdd();

        builder.Property(o => o.OrderNumber).HasMaxLength(32);
        builder.Property(o => o.SenderCity).HasMaxLength(256).IsRequired();
        builder.Property(o => o.SenderAddress).HasMaxLength(512).IsRequired();
        builder.Property(o => o.RecipientCity).HasMaxLength(256).IsRequired();
        builder.Property(o => o.RecipientAddress).HasMaxLength(512).IsRequired();
        builder.Property(o => o.PickupDate).HasColumnType("date");
    }
}
