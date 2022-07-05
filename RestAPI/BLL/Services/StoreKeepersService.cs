using AutoMapper;
using RestAPI.BLL.Dtos.CommonDtos;
using RestAPI.BLL.Dtos.StoreKeepersDtos;
using RestAPI.BLL.Interfaces;
using RestAPI.DAL.Interfaces;
using RestAPI.DAL.Models;
using RestAPI.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Services
{
    public class StoreKeepersService : IStoreKeepersService
    {
        private readonly IStoreKeepersRepository _storeKeepersRepository;
        private readonly Mapper _mapper;

        public StoreKeepersService(IStoreKeepersRepository storeKeepersService, Mapper mapper)
        {
            _storeKeepersRepository = storeKeepersService;
            _mapper = mapper;
        }

        public async Task<int> AddAsync(AddStoreKeeperDto dto)
        {
            var storeKeeper = _mapper.Map<StoreKeeper>(dto);
            return await _storeKeepersRepository.AddAsync(storeKeeper);
        }

        public async Task<StoreKeeperDto> GetAsync(int id)
        {
            var storeKeeper = await _storeKeepersRepository.GetAsyncIncludingDetails(id);
            return storeKeeper.ToStoreKeeperDto();
        }

        public async Task<int> GetDetailsCount(int id)
        {
            return await _storeKeepersRepository.GetNotRemovedDetailsCountAsync(id);
        }

        public Task<SelectionResult<StoreKeeperDto>> GetManyAsync(PageSelectionDto selectionDto)
        {
            var storeKeepers = _storeKeepersRepository.GetQueryableIncludingDetails();
            var storeKeepersCount = storeKeepers.Count();
            storeKeepers = storeKeepers.Skip(selectionDto.PageNumber * selectionDto.ElementsCount).Take(selectionDto.ElementsCount);
            var selectionResult = new SelectionResult<StoreKeeperDto>()
            {
                CurrentPage = selectionDto.PageNumber,
                PagesCount = (int)Math.Ceiling((double)storeKeepersCount / selectionDto.ElementsCount),
                Elements = storeKeepers.Select(storeKeeper => storeKeeper.ToStoreKeeperDto())
            };
            return Task.FromResult(selectionResult);
        }

        public async Task<bool> IsExistsAsync(int id)
        {
            return await _storeKeepersRepository.IsExistsAsync(id);
        }

        public async Task RemoveAsync(int id)
        {
            if (await _storeKeepersRepository.GetDetailsCountAsync(id) == 0)
            {
                await _storeKeepersRepository.RemoveByIdAsync(id);
            }
        }
    }
}
