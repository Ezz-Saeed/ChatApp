using ChatApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace ChatApp.Data.Seed
{
    public class AppUserSeed
    {
        public static async Task SeedUsersAsync(AppDbContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = File.ReadAllText("Data/Seed/UserSeedData.json");
            
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach(var user in users)
            {
                var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Ab$$123"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }
            await context.SaveChangesAsync();
        }
    }
}
