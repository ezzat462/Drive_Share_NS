using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DriveShare.API.Migrations
{
    /// <inheritdoc />
    public partial class AddCarFilters : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BodyType",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Transmission",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEGwuBtjxvAi6059PSnkZ20QYO9Ai1J5rezZ8N2owDR6CIuD7e5VW7IUNBxihVskhhw==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BodyType",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Transmission",
                table: "Cars");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEEU/vx+HfPYoIKuf8nTuGLVyl+4Uy362zC/gwtK7U3RUnRYLe7rPilZpdR8aXnWOUg==");
        }
    }
}
