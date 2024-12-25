using AutoMapper;
using ChatApp.Data;
using ChatApp.DTOs;
using ChatApp.Interfaces;
using ChatApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository repository, IMapper mapper) : BasApiController
    {


        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await repository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{name}")]        
        public async Task<MemberDto> GetUser(string name)
        {
            var user = await repository.GetMemberAsync(name);
            return user;
        }
    }
}
