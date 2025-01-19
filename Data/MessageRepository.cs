using AutoMapper;
using AutoMapper.QueryableExtensions;
using ChatApp.DTOs;
using ChatApp.Helpers;
using ChatApp.Interfaces;
using ChatApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Data
{
    public class MessageRepository(AppDbContext context, IMapper mapper) : IMessageRepository
    {
        public void AddMessage(Message message)
        {
            context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await context.Messages.Include(m=>m.Sender).Include(m=>m.Recipient).FirstOrDefaultAsync(m=>m.Id == id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = context.Messages.OrderByDescending(m => m.MessageSent).AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(m=>m.Recipient.UserName == messageParams.UserName && m.RecipientDeleted==false),
                "Outbox" => query.Where(m=>m.Sender.UserName == messageParams.UserName && m.SenderDeleted==false),
                _ => query.Where(m => m.Recipient.UserName == messageParams.UserName && m.DateRead == null && m.RecipientDeleted == false)
            };

            var messages = query.ProjectTo<MessageDto>(mapper.ConfigurationProvider);
            return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThred(string currentUserName, string recipientUsername)
        {
            var messages = await context.Messages
                .Include(m=>m.Recipient).ThenInclude(r=>r.Photos)
                .Include(m=>m.Sender).ThenInclude(s=>s.Photos)
                .Where(
                    m=>m.Recipient.UserName==currentUserName && 
                    m.Sender.UserName == recipientUsername && m.RecipientDeleted==false || 
                    m.Recipient.UserName == recipientUsername && 
                    m.Sender.UserName == currentUserName && m.SenderDeleted==false
                ).OrderBy(m=>m.MessageSent).ToListAsync();

            var unreadMessage = messages.Where(m=>m.DateRead == null && m.Recipient.UserName==currentUserName).ToList();

            if(unreadMessage.Any())
            {
                foreach(var message in unreadMessage)
                {
                    message.DateRead = DateTime.Now;                   
                }
                await context.SaveChangesAsync();
            }

            return mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}
