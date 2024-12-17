using ChatApp.Models;

namespace ChatApp.Interfaces
{
    public interface ITokenService
    {
        string GetToken(AppUser appUser);
    }
}
