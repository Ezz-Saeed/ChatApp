using ChatApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Data
{
    public class AppDbContext : IdentityDbContext<AppUser, AppRole,int, IdentityUserClaim<int>,
        AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int> ,IdentityUserToken<int>>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public virtual DbSet<UserLike> Likes {  get; set; }
        public virtual DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppUser>()
                .HasMany(u => u.UserRoles)
                .WithOne(ur => ur.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();

            modelBuilder.Entity<AppRole>()
                .HasMany(r=>r.UserRoles)
                .WithOne(ur=>ur.Role)
                .HasForeignKey(r=>r.RoleId)
                .IsRequired();

            modelBuilder.Entity<UserLike>()
                .HasKey(ul => new { ul.SourceUserId, ul.LikedUserId });

            modelBuilder.Entity<UserLike>()
                .HasOne(ul => ul.SourceUser)
                .WithMany(u => u.LikedUsers)
                .HasForeignKey(u => u.SourceUserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<UserLike>()
                .HasOne(ul => ul.LikedUser)
                .WithMany(u => u.LikedByUsers)
                .HasForeignKey(u => u.LikedUserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(s => s.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Recipient)
                .WithMany(r => r.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
