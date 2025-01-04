using AutoMapper;
using ChatApp.Data;
using ChatApp.DTOs;
using ChatApp.Extensions;
using ChatApp.Helpers;
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
    public class UsersController(IUserRepository repository, IMapper mapper, IPhotoService photoService) : BasApiController
    {


        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery]UserParams userParams)
        {
            var users = await repository.GetMembersAsync(userParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }

        [HttpGet("{name}", Name ="GetUser")]        
        public async Task<MemberDto> GetUser(string name)
        {
            var user = await repository.GetMemberAsync(name);
            return user;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(UpdateMemberDto updateMemberDto)
        {
            var user = await repository.GetByUserNameAsync(User.GetUserName());
            if(user is null) return Unauthorized("Unauthorized user!");

            mapper.Map(updateMemberDto, user);
            repository.UpdateUser(user);
            if(await repository.SaveAllAsync()) return NoContent();
            return BadRequest("Couldn't update profile");
        }

        [HttpPost("addPhoto")]
        public async Task<ActionResult<PhotoDto>> AddPhotAsync(IFormFile file)
        {
            var user = await repository.GetByUserNameAsync(User.GetUserName());

            var result = await photoService.AddImageAsync(file);
            if(result.Error is not null) return BadRequest(result.Error.Message);

            var photo = new Photo()
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
            };

            if(user.Photos.Count == 0)
                photo.IsMain = true;

            user.Photos.Add(photo);
            if (await repository.SaveAllAsync())
            {
                //return mapper.Map<PhotoDto>(photo);
                return CreatedAtRoute("GetUser", new { name = user.UserName }, mapper.Map<PhotoDto>(photo));
            }
                
            return BadRequest("Couldn't upload photo!");
        }

        [HttpPut("setMainPhoto/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await repository.GetByUserNameAsync(User.GetUserName());
            var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);

            if (photo.IsMain) return BadRequest("This is already your main photo!");

            var currentMain = user.Photos.FirstOrDefault(p => p.IsMain);
            if (currentMain is not null) currentMain.IsMain = false;
            photo.IsMain = true;

            if(await repository.SaveAllAsync()) return NoContent();
            return BadRequest("Couldn't update profile!");
        }

        [HttpDelete("deletePhoto/{id}")]
        public async Task<ActionResult> DeletePhoto(int id)
        {
            var user = await repository.GetByUserNameAsync(User.GetUserName());
            var photo = user.Photos.FirstOrDefault(p=>p.Id == id);
            if(photo is null) return NotFound();

            if (photo.IsMain) return BadRequest("Main photo can not be deleted!");

            if(photo.PublicId is not null)
            {
                var result = await photoService.DeleteImageAsync(photo.PublicId);
                if(result.Error is not null) return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);
            if(await repository.SaveAllAsync() ) return Ok();
            return BadRequest("Could't delete photo!");
        }
    }
}
