using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Versta.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderNumber = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    SenderCity = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    SenderAddress = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false),
                    RecipientCity = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    RecipientAddress = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false),
                    Weight = table.Column<double>(type: "double precision", nullable: false),
                    PickupDate = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
