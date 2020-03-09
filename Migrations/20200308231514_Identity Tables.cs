using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FantasyStockTracker.Migrations
{
    public partial class IdentityTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Holdings",
                keyColumn: "Id",
                keyValue: new Guid("2cb0d0b9-3c13-47d4-867f-3d26cec8311e"));

            migrationBuilder.DeleteData(
                table: "Holdings",
                keyColumn: "Id",
                keyValue: new Guid("56cf61d8-ad27-4411-849f-7ce6a8b6667a"));

            migrationBuilder.DeleteData(
                table: "Holdings",
                keyColumn: "Id",
                keyValue: new Guid("b0839923-b3da-41c5-99d3-667e2869e7cb"));

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("be88b32d-fc7a-4530-a799-6b8bf9373944"), "Value 101" });

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("54b19043-175c-4ae0-97b6-c877311d024b"), "Value 202" });

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("e687a6c2-8427-4636-8032-603ce9bc7b6d"), "Value 303" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Holdings",
                keyColumn: "Id",
                keyValue: new Guid("54b19043-175c-4ae0-97b6-c877311d024b"));

            migrationBuilder.DeleteData(
                table: "Holdings",
                keyColumn: "Id",
                keyValue: new Guid("be88b32d-fc7a-4530-a799-6b8bf9373944"));

            migrationBuilder.DeleteData(
                table: "Holdings",
                keyColumn: "Id",
                keyValue: new Guid("e687a6c2-8427-4636-8032-603ce9bc7b6d"));

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("56cf61d8-ad27-4411-849f-7ce6a8b6667a"), "Value 101" });

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("2cb0d0b9-3c13-47d4-867f-3d26cec8311e"), "Value 202" });

            migrationBuilder.InsertData(
                table: "Holdings",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("b0839923-b3da-41c5-99d3-667e2869e7cb"), "Value 303" });
        }
    }
}
