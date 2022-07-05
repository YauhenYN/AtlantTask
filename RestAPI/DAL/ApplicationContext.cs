using Microsoft.EntityFrameworkCore;
using RestAPI.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.DAL
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Detail> Details { get; set; }
        public DbSet<StoreKeeper> StoreKeepers { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
