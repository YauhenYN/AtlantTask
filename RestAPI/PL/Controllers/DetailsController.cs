using Microsoft.AspNetCore.Mvc;
using RestAPI.BLL.Dtos.CommonDtos;
using RestAPI.BLL.Dtos.DetailsDtos;
using RestAPI.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.PL.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DetailsController : ControllerBase
    {
        private readonly IDetailsService _detailsService;
        private readonly IStoreKeepersService _storeKeepersService;
        public DetailsController(IDetailsService detailsService, IStoreKeepersService storeKeepersService)
        {
            _detailsService = detailsService;
            _storeKeepersService = storeKeepersService;
        }

        [HttpGet]
        [Route("Many")]
        public async Task<ActionResult<SelectionResult<DetailDto>>> GetManyAsync([FromQuery]PageSelectionDto selectionDto)
        {
            var selectionResult = await _detailsService.GetManyAsync(selectionDto);
            if (selectionResult.Elements.Count() > 0) return selectionResult;
            return NotFound();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<DetailDto>> GetAsync(int id)
        {
            var detail = await _detailsService.GetAsync(id);
            if (detail != null) return detail;
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync(AddDetailDto dto)
        {
            if (!await _storeKeepersService.IsExistsAsync(dto.StoreKeeperId)) return Conflict();
            int id = await _detailsService.AddAsync(dto);
            return CreatedAtRoute(null, new
            {
                Id = id
            });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> RemoveAsync(int id)
        {
            if (await _detailsService.IsRemovedAsync(id)) return Conflict();
            await _detailsService.RemoveAsync(id);
            return NoContent();
        } 
    }
}
