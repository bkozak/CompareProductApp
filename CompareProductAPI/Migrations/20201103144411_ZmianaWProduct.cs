using Microsoft.EntityFrameworkCore.Migrations;

namespace CompareProductAPI.Migrations
{
    public partial class ZmianaWProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "UnitPrice",
                table: "Product",
                nullable: true,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<int>(
                name: "SKU",
                table: "Product",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Product",
                nullable: true,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<int>(
                name: "EAN",
                table: "Product",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Product",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ProductIdFromShop",
                table: "Product",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Product",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "brand",
                table: "Product",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ProductIdFromShop",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "brand",
                table: "Product");

            migrationBuilder.AlterColumn<double>(
                name: "UnitPrice",
                table: "Product",
                nullable: false,
                oldClrType: typeof(double),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SKU",
                table: "Product",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Product",
                nullable: false,
                oldClrType: typeof(double),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EAN",
                table: "Product",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
