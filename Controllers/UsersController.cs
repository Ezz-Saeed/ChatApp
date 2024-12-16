using ChatApp.Data;
using ChatApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Controllers
{

    public class UsersController(AppDbContext context) : BasApiController
    {


        [HttpGet]
        public async Task<IEnumerable<AppUser>> GetUsers()
        {
            return await context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<AppUser> GetUser(int id)
        {
            return await context.Users.FindAsync(id);
        }
    }
}
