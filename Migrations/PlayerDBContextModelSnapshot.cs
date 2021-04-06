﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Models;

namespace WebAPI.Migrations
{
    [DbContext(typeof(PlayerDBContext))]
    partial class PlayerDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAPI.Models.Player", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte>("age")
                        .HasColumnType("tinyint");

                    b.Property<string>("citizenship")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("currentClub")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("fullName")
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("marketValue")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("position")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("id");

                    b.ToTable("Players");
                });
#pragma warning restore 612, 618
        }
    }
}