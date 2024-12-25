using ChatApp.Interfaces;
using ChatApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Data
{
    public class UserRepository(AppDbContext context) : IUserRepository
    {
        public async Task<IEnumerable<AppUser>> GetAllAsync()
        {
            return await context.Users.Include(u=>u.Photos).ToListAsync();
        }

        public async Task<AppUser> GetByIdAsync(int id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetByUserNameAsync(string userName)
        {
            return await context.Users.Include(u => u.Photos).SingleOrDefaultAsync(u => u.UserName == userName);
        }

        public async Task<bool> SaveAllAsync()
        {
           return await context.SaveChangesAsync()>0;
        }

        public void UpdateUser(AppUser user)
        {
            context.Entry(user).State = EntityState.Modified;
        }
    }
}
