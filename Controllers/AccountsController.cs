using ChatApp.Data;
using ChatApp.DTOs;
using ChatApp.Interfaces;
using ChatApp.Models;
using ChatApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace ChatApp.Controllers
{
    public class AccountsController(AppDbContext context, ITokenService tokenService) : BasApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
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
            return new UserDto
            {
                UserName = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.SingleOrDefaultAsync(u=>u.UserName==loginDto.UserName);

            if (user is null) return Unauthorized("Unauthorized user!");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i = 0; i < passwordHash.Length; i++)
            {
                if (passwordHash[i] != user.PasswordHash[i])
                    return Unauthorized("Unauthorized user!");
            }

            return new UserDto
            {
                UserName = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        private async Task<bool> CheckUserExists(string userName)
        {
            return await context.Users.AnyAsync(u=>u.UserName == userName.ToLower());
        }
    }
}
