using Microsoft.EntityFrameworkCore.Migrations;

namespace FantasyStockTracker.Migrations
{
    public partial class SeedHolding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Value 101" });

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Value 202" });

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "Value 202" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Holdings",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Holdings",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Holdings",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
