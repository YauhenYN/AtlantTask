using Microsoft.EntityFrameworkCore;
using RestAPI.DAL.Interfaces;
using RestAPI.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.DAL.Repositories
{
    public class DetailsRepository : Repository, IDetailsRepository
    {
        public DetailsRepository(ApplicationContext context)
            :base(context)
        {
        }
        
        public async Task<int> AddAsync(Detail detail)
        {
            await _context.Details.AddAsync(detail);
            await _context.SaveChangesAsync();
            return detail.DetailId;
        }

        public async Task<Detail> GetAsync(int id)
        {
            return await _context.Details.FirstOrDefaultAsync(detail => detail.DetailId == id);
        }

        public int GetNotRemovedCountByStoreKeeperId(int storeKeeperId)
        {
            return _context.Details.Where(detail => detail.StoreKeeperId == storeKeeperId && detail.RemovingDate == null).Count();
        }

        public IQueryable<Detail> GetQueryable()
        {
            return _context.Details;
        }
        public async Task<Detail> GetIncludingStoreKeeperAsync(int id)
        {
            return await _context.Details.Include(detail => detail.StoreKeeper).
                FirstOrDefaultAsync(detail => detail.DetailId == id);
        }

        public IQueryable<Detail> GetQueryableIncludingStoreKeepersAsync()
        {
            return _context.Details.Include(detail => detail.StoreKeeper);
        }

        public async Task<bool> IsRemovedAsync(int id)
        {
            return !await _context.Details.AnyAsync(detail => detail.DetailId == id && detail.RemovingDate == null);
        }

        public async Task RemoveByIdAsync(int id)
        {
            var detail = await _context.Details.FirstOrDefaultAsync(detail => detail.DetailId == id);
            detail.RemovingDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }
}
