using AutoMapper;
using ChatApp.Data;
using ChatApp.DTOs;
using ChatApp.Interfaces;
using ChatApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

        [HttpPut]
        public async Task<ActionResult> UpdateMember(UpdateMemberDto updateMemberDto)
        {
            var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await repository.GetByUserNameAsync(userName);
            if(user is null) return Unauthorized("Unauthorized user!");

            mapper.Map(updateMemberDto, user);
            repository.UpdateUser(user);
            if(await repository.SaveAllAsync()) return NoContent();
            return BadRequest("Couldn't update profile");
        }
    }
}
