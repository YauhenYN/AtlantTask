using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.DAL.Interfaces
{
    public interface IRepository<T>
    {
        public IQueryable<T> GetQueryable();
    }
}
