using ChatApp.Errors;
using System.Net;
using System.Text.Json;

namespace ChatApp.Middlwares
{
    public class ExceptionMiddleware(RequestDelegate next, 
        ILogger<ExceptionMiddleware> logger, IHostEnvironment hostEnvironment)
    {
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex,ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var response = hostEnvironment.IsDevelopment() ?
                    new ApiException(500, ex.Message, ex.StackTrace?.ToString()) :
                    new ApiException(500, "Internal server error");
                var options = new JsonSerializerOptions { PropertyNamingPolicy= JsonNamingPolicy.CamelCase};

                var serilizedResponse = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(serilizedResponse);
            }
        }
    }
}
