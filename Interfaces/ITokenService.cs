using ChatApp.Models;

namespace ChatApp.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser appUser);
    }
}
