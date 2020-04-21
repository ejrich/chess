using Microsoft.EntityFrameworkCore;

namespace Chess.Web.Dal
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions options) : base(options)
        {
        }

        // public DbSet<User> Users { get; set; }
        // public DbSet<Tag> Tags { get; set; }
        // public DbSet<UserAttempt> Attempts { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<Tag>()
        //         .HasOne(_ => _.User)
        //         .WithMany(_ => _.Tags)
        //         .HasForeignKey(_ => _.UserEmail);
        // }
    }
}
