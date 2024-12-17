using ChatApp.Data;
using ChatApp.Interfaces;
using ChatApp.Services;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connection = configuration.GetConnectionString("localConnection") ??
                throw new NullReferenceException("Couldn't connect to db!");
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(connection);
            });


            services.AddCors(options =>
            {
                options.AddPolicy("CorsePolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
                });
            });


            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}
