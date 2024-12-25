using ChatApp.Data;
using ChatApp.Interfaces;
using ChatApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository repository) : BasApiController
    {


        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await repository.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{name}")]        
        public async Task<AppUser> GetUser(string name)
        {
            return await repository.GetByUserNameAsync(name);
        }
    }
}
