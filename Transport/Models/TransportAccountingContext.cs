using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Transport.Models
{
    public partial class TransportAccountingContext : DbContext
    {
        public TransportAccountingContext()
        {
        }

        public TransportAccountingContext(DbContextOptions<TransportAccountingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Transport> Transports { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost;Database=TransportAccounting;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("Client");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("firstName");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("lastName");

                entity.Property(e => e.Patronymic)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("patronymic");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Client).HasColumnName("client");

                entity.Property(e => e.OrderData)
                    .HasColumnType("datetime")
                    .HasColumnName("orderData");

                entity.Property(e => e.OrderTime)
                     .HasColumnType("datetime")
                     .HasColumnName("orderTime");

                entity.Property(e => e.OrderPrice)
                    .HasColumnType("money")
                    .HasColumnName("orderPrice");

                entity.Property(e => e.Transport).HasColumnName("transport");

                entity.HasOne(d => d.ClientNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Client)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Order_Client");

                entity.HasOne(d => d.TransportNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Transport)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Order_Transport");
            });

            modelBuilder.Entity<Transport>(entity =>
            {
                entity.HasKey(e => e.Number)
                    .HasName("PK_Transport_1");

                entity.ToTable("Transport");

                entity.Property(e => e.Number)
                    .ValueGeneratedNever()
                    .HasColumnName("number");

                entity.Property(e => e.Capacity).HasColumnName("capacity");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Speed).HasColumnName("speed");

                entity.Property(e => e.TechnicalСondition)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("technicalСondition");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("type");

                entity.Property(e => e.Weight).HasColumnName("weight");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
