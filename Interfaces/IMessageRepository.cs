using ChatApp.DTOs;
using ChatApp.Helpers;
using ChatApp.Models;

namespace ChatApp.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThred(int currentUserId, int recipientId);
        Task<bool> SaveAllAsync();
    }
}
