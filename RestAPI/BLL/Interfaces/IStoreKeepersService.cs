using RestAPI.BLL.Dtos.CommonDtos;
using RestAPI.BLL.Dtos.StoreKeepersDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Interfaces
{
    public interface IStoreKeepersService
    {
        public Task<SelectionResult<StoreKeeperDto>> GetManyAsync(PageSelectionDto selectionDto);
        public Task<StoreKeeperDto> GetAsync(int id);
        public Task<int> AddAsync(AddStoreKeeperDto dto);
        public Task RemoveAsync(int id);
        public Task<int> GetDetailsCount(int id);
        public Task<bool> IsExistsAsync(int id);
    }
}
