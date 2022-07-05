using RestAPI.DAL.Interfaces;
using RestAPI.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RestAPI.DAL.Repositories
{
    public class StoreKeepersRepository : Repository, IStoreKeepersRepository
    {
        public StoreKeepersRepository(ApplicationContext context)
            : base(context)
        {
        }
        public async Task<int> AddAsync(StoreKeeper storeKeeper)
        {
            await _context.StoreKeepers.AddAsync(storeKeeper);
            await _context.SaveChangesAsync();
            return storeKeeper.StoreKeeperId;
        }

        public async Task<StoreKeeper> GetAsync(int id)
        {
            return await _context.StoreKeepers.FirstOrDefaultAsync(storeKeeper => storeKeeper.StoreKeeperId == id);
        }

        public async Task<StoreKeeper> GetAsyncIncludingDetails(int id)
        {
            return await _context.StoreKeepers.Include(storeKeeper => storeKeeper.Details).
                FirstOrDefaultAsync(storeKeeper => storeKeeper.StoreKeeperId == id);
        }
        public async Task<int> GetDetailsCountAsync(int id)
        {
            var storeKeeper = await _context.StoreKeepers.Include(storeKeeper => storeKeeper.Details).
                FirstOrDefaultAsync(storeKeeper => storeKeeper.StoreKeeperId == id);
            if (storeKeeper == null) return -1;
            else return storeKeeper.Details.Count();
        }

        public async Task<int> GetNotRemovedDetailsCountAsync(int id)
        {
            var storeKeeper = await _context.StoreKeepers.Include(storeKeeper => storeKeeper.Details).
                FirstOrDefaultAsync(storeKeeper => storeKeeper.StoreKeeperId == id);
            if (storeKeeper == null) return -1;
            else return storeKeeper.Details.Where(sk => sk.RemovingDate == null).Count();
        }

        public IQueryable<StoreKeeper> GetQueryable()
        {
            return _context.StoreKeepers;
        }

        public IQueryable<StoreKeeper> GetQueryableIncludingDetails()
        {
            return _context.StoreKeepers.Include(storeKeeper => storeKeeper.Details);
        }

        public Task<bool> IsExistsAsync(int id)
        {
            return _context.StoreKeepers.AnyAsync(storeKeeper => storeKeeper.StoreKeeperId == id);
        }

        public async Task RemoveByIdAsync(int id)
        {
            var storeKeeper = await _context.StoreKeepers.Include(storeKeeper => storeKeeper.Details).
                FirstOrDefaultAsync(storeKeeper => storeKeeper.StoreKeeperId == id);
            _context.StoreKeepers.Remove(storeKeeper);
            await _context.SaveChangesAsync();
        }
    }
}
