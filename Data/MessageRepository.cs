using AutoMapper;
using AutoMapper.QueryableExtensions;
using ChatApp.DTOs;
using ChatApp.Helpers;
using ChatApp.Interfaces;
using ChatApp.Models;

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
            return await context.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = context.Messages.OrderByDescending(m => m.MessageSent).AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(m=>m.Recipient.UserName == messageParams.UserName),
                "Outbox" => query.Where(m=>m.Sender.UserName == messageParams.UserName),
                _ => query.Where(m => m.Recipient.UserName == messageParams.UserName && m.DateRead == null)
            };

            var messages = query.ProjectTo<MessageDto>(mapper.ConfigurationProvider);
            return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public Task<IEnumerable<MessageDto>> GetMessageThred(int currentUserId, int recipientId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}
