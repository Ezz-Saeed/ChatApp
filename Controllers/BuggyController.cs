using ChatApp.Data;
using ChatApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
    public class BuggyController(AppDbContext context) : BasApiController
    {
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "Secret text";
        }

        [HttpGet("notFound")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = context.Users.Find(-1);
            if(thing is null) return NotFound();
            return Ok(thing);
        }

        [HttpGet("serverError")]
        public ActionResult<string> GetServerError()
        {
            var thing = context.Users.Find(-1);
            var thingToReturn = thing.ToString();
            return thingToReturn;
        }

        [HttpGet("badRequest")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("Bad request!");
        }

    }
}
