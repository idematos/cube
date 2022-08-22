using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cube_api.Migrations
{
    public partial class TransactionKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Transactions_TypeId",
                table: "Transactions");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_TypeId_Date_ProductDescription_Value_SellerName",
                table: "Transactions",
                columns: new[] { "TypeId", "Date", "ProductDescription", "Value", "SellerName" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Transactions_TypeId_Date_ProductDescription_Value_SellerName",
                table: "Transactions");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_TypeId",
                table: "Transactions",
                column: "TypeId");
        }
    }
}
