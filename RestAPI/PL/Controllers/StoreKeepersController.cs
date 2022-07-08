using Microsoft.AspNetCore.Mvc;
using RestAPI.BLL.Dtos.CommonDtos;
using RestAPI.BLL.Dtos.StoreKeepersDtos;
using RestAPI.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.PL.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StoreKeepersController : ControllerBase
    {
        private readonly IStoreKeepersService _storeKeepersService;
        public StoreKeepersController(IStoreKeepersService storeKeepersService)
        {
            _storeKeepersService = storeKeepersService;
        }
        [HttpGet]
        [Route("Many")]
        public async Task<ActionResult<SelectionResult<StoreKeeperDto>>> GetManyAsync([FromQuery]PageSelectionDto selectionDto)
        {
            var selectionResult = await _storeKeepersService.GetManyAsync(selectionDto);
            if (selectionResult.Elements.Count() > 0) return selectionResult;
            return NotFound();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<StoreKeeperDto>> GetAsync(int id)
        {
            var storeKeeper = await _storeKeepersService.GetAsync(id);
            if (storeKeeper != null) return storeKeeper;
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync(AddStoreKeeperDto dto)
        {
            var id = await _storeKeepersService.AddAsync(dto);
            return CreatedAtRoute(null, new {
                Id = id
            });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> RemoveAsync(int id)
        {
            var isExists = await _storeKeepersService.IsExistsAsync(id);
            if (!isExists) return NotFound();
            else if (!(await _storeKeepersService.GetDetailsCount(id) == 0)) return Conflict();
            await _storeKeepersService.RemoveAsync(id);
            return NoContent();
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<int>> GetDetailsCount(int id)
        {
            return await _storeKeepersService.GetDetailsCount(id);
        }
    }
}
