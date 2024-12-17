﻿using ChatApp.Interfaces;
using ChatApp.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ChatApp.Services
{
    public class TokenService(IConfiguration configuration) : ITokenService
    {
        private readonly SymmetricSecurityKey symmetricSecurityKey = 
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["securityKey"]!));
        public string GetToken(AppUser appUser)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, appUser.UserName)
            };

            var credintials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512Signature);

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = credintials,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(descriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}