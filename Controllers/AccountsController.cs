using AutoMapper;
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
    public class AccountsController(AppDbContext context, ITokenService tokenService, IMapper mapper) : BasApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await CheckUserExists(registerDto.UserName)) return BadRequest("Username is already taken");
            var user = mapper.Map<AppUser>(registerDto);
            
            user.UserName = registerDto.UserName.ToLower();

            context.Users.Add(user);
            await context.SaveChangesAsync();
            return new UserDto
            {
                UserName = user.UserName,
                Token = tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender,
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.Include(u=>u.Photos).SingleOrDefaultAsync(u=>u.UserName==loginDto.UserName);

            if (user is null) return Unauthorized("Unauthorized user!");

            return new UserDto
            {
                UserName = user.UserName,
                Token = tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(p=>p.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender=user.Gender,
            };
        }

        private async Task<bool> CheckUserExists(string userName)
        {
            return await context.Users.AnyAsync(u=>u.UserName == userName.ToLower());
        }
    }
}
