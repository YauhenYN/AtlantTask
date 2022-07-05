using RestAPI.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.DAL.Interfaces
{
    public interface IStoreKeepersRepository : IRepository<StoreKeeper>
    {
        public Task<StoreKeeper> GetAsync(int id);
        public Task<StoreKeeper> GetAsyncIncludingDetails(int id);
        public Task<int> AddAsync(StoreKeeper storeKeeper);
        public Task RemoveByIdAsync(int id);
        public Task<int> GetDetailsCountAsync(int id);
        public Task<int> GetNotRemovedDetailsCountAsync(int id);
        public Task<bool> IsExistsAsync(int id);
        public IQueryable<StoreKeeper> GetQueryableIncludingDetails();
    }
}
