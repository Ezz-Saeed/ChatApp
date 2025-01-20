using ChatApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace ChatApp.Data.Seed
{
    public class AppUserSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = File.ReadAllText("Data/Seed/UserSeedData.json");
            
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach(var user in users)
            {
                user.UserName = user.UserName.ToLower();

                await userManager.CreateAsync(user, "Ab$$123");
            }
        }
    }
}
