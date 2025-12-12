using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using ProjectTasksManager.Models;

namespace ProjectTasksManager.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email).IsUnique();
            });
            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasIndex(p => p.Title).IsUnique();
            });
        }
    }
}
