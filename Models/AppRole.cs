using Microsoft.AspNetCore.Identity;

namespace ChatApp.Models
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
