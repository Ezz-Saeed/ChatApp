using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
    public class AdminController : BasApiController
    {
        [Authorize(Policy = "RequiredAdminRole")]
        [HttpGet("usersWithRoles")]
        public ActionResult GetUsersWithRoles()
        {
            return Ok("Only admin can see this");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosToModerate")]
        public ActionResult GetPhotosForModeration()
        {
            return Ok("Admin or Moderators can see this");
        }
    }
}
