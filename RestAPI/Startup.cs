using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using RestAPI.BLL.Dtos.DetailsDtos;
using RestAPI.BLL.Dtos.StoreKeepersDtos;
using RestAPI.BLL.Interfaces;
using RestAPI.BLL.Services;
using RestAPI.DAL;
using RestAPI.DAL.Interfaces;
using RestAPI.DAL.Models;
using RestAPI.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationContext>(optionsBuilder =>
            {
                optionsBuilder.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddCors();

            services.AddSingleton(new Mapper(new MapperConfiguration(cnf =>
            {
                cnf.CreateMap<AddDetailDto, Detail>();
                cnf.CreateMap<Detail, DetailDto>();
                cnf.CreateMap<AddStoreKeeperDto, StoreKeeper>();
                cnf.CreateMap<StoreKeeper, StoreKeeperDto>();
            })));

            //DAL
            services.AddScoped<IDetailsRepository, DetailsRepository>();
            services.AddScoped<IStoreKeepersRepository, StoreKeepersRepository>();

            //BLL
            services.AddScoped<IDetailsService, DetailsService>();
            services.AddScoped<IStoreKeepersService, StoreKeepersService>();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "RestAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RestAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(options =>
            {
                options.AllowAnyOrigin();
                options.AllowAnyHeader();
                options.AllowAnyMethod();
            });

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
