using AutoMapper;
using ChatApp.DTOs;
using ChatApp.Extensions;
using ChatApp.Helpers;
using ChatApp.Interfaces;
using ChatApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
    [Authorize]
    public class MessagesController(IUserRepository userRepository, 
        IMessageRepository messageRepository, IMapper mapper) : BasApiController
    {
        [HttpPost]
        public async Task<ActionResult<MessageDto>> SendMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUserName();
            var sender = await userRepository.GetByUserNameAsync(username);

            var recipient = await userRepository.GetByUserNameAsync(createMessageDto.RecipientUserName);

            if (recipient is null) return NotFound($"Couldn't find user with username ${createMessageDto.RecipientUserName}");

            var message = new Message
            {
                Sender = sender,
                SenderUserName = username,
                Recipient = recipient,
                RecipientUserName = recipient.UserName,
                Content = createMessageDto.Content
            };

            messageRepository.AddMessage(message);
            if (await messageRepository.SaveAllAsync()) return Ok(mapper.Map<MessageDto>(message));

            return BadRequest("Couldn't send message!");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>>GetMessage([FromQuery]MessageParams messageParams)
        {
            messageParams.UserName = User.GetUserName();
            var messages = await messageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);
            return messages;
        }

        [HttpGet("thread/{userName}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMEssageThread(string userName)
        {
            var currentUserNAme = User.GetUserName();
            return Ok(await messageRepository.GetMessageThred(currentUserNAme,userName));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var userName = User.GetUserName();
            var message = await messageRepository.GetMessage(id);

            if (message == null) return BadRequest();

            if(message.Sender.UserName != userName && message.Recipient.UserName != userName)
                return Unauthorized();

            if(message.Sender.UserName == userName)
                message.SenderDeleted = true;

            if (message.Recipient.UserName == userName)
                message.RecipientDeleted = true;

            if(message.SenderDeleted && message.RecipientDeleted)
                messageRepository.DeleteMessage(message);

            if (await messageRepository.SaveAllAsync()) return Ok();

            return BadRequest("Couldn't delete the message!");
        }
    }
}
