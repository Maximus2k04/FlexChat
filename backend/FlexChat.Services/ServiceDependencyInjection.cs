using FlexChat.DAL.Repositories.Interfaces;
using FlexChat.Services.interfaces;
using FlexChat.Services.services;
using Microsoft.Extensions.DependencyInjection;

namespace FlexChat.Services
{
    public static class ServiceDependencyInjection
    {
        public static IServiceCollection AddServiceLayer(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IChatService, ChatService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IThemeService, ThemeService>();
            services.AddMemoryCache();
            services.AddScoped<IThemePropertyTypeCacheService, ThemePropertyTypeCacheService>();
            services.AddScoped<IUserChatPreferenceService, UserChatPreferenceService>();


            services.AddScoped<ILookupService, LookupService>();

            return services;
        }
    }
}