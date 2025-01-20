using AutoMapper;
using ChatApp.Data;
using ChatApp.DTOs;
using ChatApp.Interfaces;
using ChatApp.Models;
using ChatApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace ChatApp.Controllers
{
    public class AccountsController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper) : BasApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await CheckUserExists(registerDto.UserName)) return BadRequest("Username is already taken");
            var user = mapper.Map<AppUser>(registerDto);
            
            user.UserName = registerDto.UserName.ToLower();

            var result = await userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest();

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
            var user = await userManager.Users.Include(u=>u.Photos).SingleOrDefaultAsync(u=>u.UserName==loginDto.UserName);

            if (user is null) return Unauthorized("Unauthorized user!");

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized("Unauthorized user!");

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
            return await userManager.Users.AnyAsync(u=>u.UserName == userName.ToLower());
        }
    }
}
