using RestAPI.BLL.Dtos.CommonDtos;
using RestAPI.BLL.Dtos.DetailsDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Interfaces
{
    public interface IDetailsService
    {
        public Task<SelectionResult<DetailDto>> GetManyAsync(PageSelectionDto selectionDto);
        public Task<int> AddAsync(AddDetailDto dto);
        public Task<DetailDto> GetAsync(int id);
        public Task RemoveAsync(int id);
        public Task<bool> IsRemovedAsync(int id);
    }
}
