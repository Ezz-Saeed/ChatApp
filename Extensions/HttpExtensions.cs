using ChatApp.Helpers;
using System.Text.Json;

namespace ChatApp.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response,int currentPage, int itemsPerPage,
            int otalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, otalItems, totalPages);

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };

            response.Headers.Add("pagination", JsonSerializer.Serialize(paginationHeader, options));
            response.Headers.Add("Access-control-Expose-Headers", "Pagination");
        }
    }
}
