using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CompareProductAPI.Migrations
{
    public partial class PoprawionyModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShopId",
                table: "Product",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Shop",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shop", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Product_ShopId",
                table: "Product",
                column: "ShopId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Shop_ShopId",
                table: "Product",
                column: "ShopId",
                principalTable: "Shop",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Shop_ShopId",
                table: "Product");

            migrationBuilder.DropTable(
                name: "Shop");

            migrationBuilder.DropIndex(
                name: "IX_Product_ShopId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ShopId",
                table: "Product");
        }
    }
}
