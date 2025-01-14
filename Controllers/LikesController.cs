using ChatApp.DTOs;
using ChatApp.Extensions;
using ChatApp.Interfaces;
using ChatApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
    [Authorize]
    public class LikesController(ILikeRepository likeRepository, IUserRepository userRepository) : BasApiController
    {
        [HttpPost("{userName}")]
        public async Task <ActionResult> AddLike(string userName)
        {
            var sourceUserId = User.GetUserId();
            var sourceUser = await likeRepository.GetUserWithLikes(sourceUserId);
            var likedUser = await userRepository.GetByUserNameAsync(userName);

            if(likedUser is null) return NotFound();

            var userLike = await likeRepository.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike is not null) return BadRequest("You have already liked this user!");

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.Id,
            };

            sourceUser.LikedUsers.Add(userLike);
            if (await userRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to add like");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>>GetUserLikes(string predicate)
        {
            var likes = await likeRepository.GetUserLikes(predicate, User.GetUserId());
            return Ok(likes);
        }
    }
}
