using ChatApp.DTOs;
using ChatApp.Extensions;
using ChatApp.Interfaces;
using ChatApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Data
{
    public class LikeRepository(AppDbContext context) : ILikeRepository
    {
        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {
            return await context.Likes.FindAsync(sourceUserId, likedUserId);
        }

        public async Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
        {
            var users = context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = context.Likes.AsQueryable();

            if(predicate == "liked")
            {
                likes = likes.Where(l => l.SourceUserId == userId);
                users = likes.Select(l => l.LikedUser);
            }

            if(predicate == "likedBy")
            {
                likes = likes.Where(l => l.LikedUserId == userId);
                users = likes.Select(l => l.SourceUser);
            }

            return await users.Select(user => new LikeDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Age = user.DateOfBirth.CalculateAge(),
                KnownAs = user.KnownAs,
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                City = user.City,
            }).ToListAsync();
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await context.Users.Include(u => u.LikedByUsers)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
