using ChatApp.Data;
using ChatApp.DTOs;
using ChatApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace ChatApp.Controllers
{
    public class AccountsController(AppDbContext context) : BasApiController
    {
        [HttpPost]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if (await CheckUserExists(registerDto.UserName)) return BadRequest("Username is already taken");

            using var hmac = new HMACSHA512();
            AppUser user = new()
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user;
        }

        private async Task<bool> CheckUserExists(string userName)
        {
            return await context.Users.AnyAsync(u=>u.UserName == userName.ToLower());
        }
    }
}
