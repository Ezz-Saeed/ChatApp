using ChatApp.Models;

namespace ChatApp.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser appUser);
    }
}
