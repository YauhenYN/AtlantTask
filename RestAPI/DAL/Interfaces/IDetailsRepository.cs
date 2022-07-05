using RestAPI.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.DAL.Interfaces
{
    public interface IDetailsRepository : IRepository<Detail>
    {
        public Task<Detail> GetAsync(int id);
        public Task<int> AddAsync(Detail detail);
        public Task RemoveByIdAsync(int id);
        public int GetNotRemovedCountByStoreKeeperId(int storeKeeperId);
        public Task<bool> IsRemovedAsync(int id);
    }
}
