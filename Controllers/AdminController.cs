using ChatApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Controllers
{
    public class AdminController(UserManager<AppUser> userManager) : BasApiController
    {
        [Authorize(Policy = "RequiredAdminRole")]
        [HttpGet("usersWithRoles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await userManager.Users
                .Include(u => u.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    UserName = u.UserName,
                    Roles = u.UserRoles.Select(ur => ur.Role.Name),
                }).ToListAsync();
            return Ok(users);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosToModerate")]
        public ActionResult GetPhotosForModeration()
        {
            return Ok("Admin or Moderators can see this");
        }
    }
}
