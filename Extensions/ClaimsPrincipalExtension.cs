using System.Security.Claims;

namespace ChatApp.Extensions
{
    public static class ClaimsPrincipalExtension
    {
        public static string GetUserName(this ClaimsPrincipal principal)
        {
            return principal.FindFirst(ClaimTypes.Name)!.Value;
        }

        public static int GetUserId(this ClaimsPrincipal principal)
        {
            return int.Parse(principal.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }
    }
}
