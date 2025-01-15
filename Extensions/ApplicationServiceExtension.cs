using ChatApp.Data;
using ChatApp.Helpers;
using ChatApp.Interfaces;
using ChatApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

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



            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen(c =>
            {
                var securitySchema = new OpenApiSecurityScheme
                {
                    Description = "JWT Auth Bearer Scheme",
                    Name = "Authorisation",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };

                c.AddSecurityDefinition("Bearer", securitySchema);

                var securityRequirement = new OpenApiSecurityRequirement
                {
                    {
                        securitySchema, new[] {"Bearer"}
                    }
                };

                c.AddSecurityRequirement(securityRequirement);

            });

            services.AddScoped<ILikeRepository, LikeRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<LogUserActivity>();
            services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));
            services.AddAutoMapper(typeof(MappingProfile).Assembly);

            return services;
        }
    }
}
