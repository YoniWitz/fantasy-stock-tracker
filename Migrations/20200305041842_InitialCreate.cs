using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FantasyStockTracker.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Holdings",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Holdings", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("8a918dd2-3a1c-47e4-a88c-2d2a4710e4ed"), "Value 101" });

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("96fdccd9-3245-4231-8026-9888bbb11367"), "Value 202" });

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("16ec86b8-4766-4af0-9d57-dfdf9c9b1d1b"), "Value 303" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Holdings");
        }
    }
}
