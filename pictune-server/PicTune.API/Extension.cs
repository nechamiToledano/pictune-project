using Amazon.S3;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PicTune.Core.IServices;
using PicTune.Core.Mapping;
using PicTune.Core.Models;
using PicTune.Core.Repositories;
using PicTune.Data;
using PicTune.Data.Repositories;
using PicTune.Service;
namespace PicTune.API
{
    public static  class Extension 
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IAuthService,AuthService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IMusicFileService, MusicFileService>();
            services.AddScoped<RoleManager<Role>>();

        }


        public static void ServiceDependencyInjector(this IServiceCollection s)
        {
            
            s.AddAutoMapper(typeof(MappingProfile));

            ConfigureServices(s);

        }

    }
}