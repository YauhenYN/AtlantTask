using AutoMapper;
using RestAPI.BLL.Dtos.CommonDtos;
using RestAPI.BLL.Dtos.DetailsDtos;
using RestAPI.BLL.Interfaces;
using RestAPI.DAL.Interfaces;
using RestAPI.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Services
{
    public class DetailsService : IDetailsService
    {
        private readonly IDetailsRepository _detailsRepository;
        private readonly Mapper _mapper;
        public DetailsService(IDetailsRepository detailsRepository, Mapper mapper)
        {
            _detailsRepository = detailsRepository;
            _mapper = mapper;
        }

        public async Task<int> AddAsync(AddDetailDto dto)
        {
            var detail = _mapper.Map<Detail>(dto);
            return await _detailsRepository.AddAsync(detail);
        }

        public async Task<DetailDto> GetAsync(int id)
        {
            var detail = await _detailsRepository.GetIncludingStoreKeeperAsync(id);
            return detail.ToDetailDto();
        }

        public Task<SelectionResult<DetailDto>> GetManyAsync(PageSelectionDto selectionDto)
        {
            var details = _detailsRepository.GetQueryableIncludingStoreKeepersAsync();
            var detailsCount = details.Count();
            details = details.Skip(selectionDto.PageNumber * selectionDto.ElementsCount).Take(selectionDto.ElementsCount);
            var selectionResult = new SelectionResult<DetailDto>()
            {
                CurrentPage = selectionDto.PageNumber,
                PagesCount = (int)Math.Ceiling((double)detailsCount / selectionDto.ElementsCount),
                Elements = details.Select(detail => detail.ToDetailDto())
            };
            return Task.FromResult(selectionResult);
        }

        public async Task<bool> IsRemovedAsync(int id)
        {
            return await _detailsRepository.IsRemovedAsync(id);
        }

        public async Task RemoveAsync(int id)
        {
            await _detailsRepository.RemoveByIdAsync(id);
        }
    }
}
