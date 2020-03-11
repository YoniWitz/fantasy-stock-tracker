using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FantasyStockTracker.Application;
using FantasyStockTracker.Application.interfaces;
using FantasyStockTracker.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FantasyStockTracker.Controllers
{
    public class HoldingsController : BaseController
    {
        private readonly IHoldingsApp _holdingsApp;

        public HoldingsController(IHoldingsApp holdingsApp)
        {
            _holdingsApp = holdingsApp;
        }

        //Get holdings
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<HoldingDTO>>> Get()
        {
            var holdingsDTOs = await _holdingsApp.GetHoldingsDTOs();
            return Ok(holdingsDTOs);
        }

        //Get holdings/1
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<HoldingDTO>> Get(Guid id)
        {
            var holdingDTO = await _holdingsApp.GetHoldingDTO(id);
            return Ok(holdingDTO);
        }

        //Post holdings
        [HttpPost]
        public async Task<ActionResult> Post(HoldingDTO holdingDto)
        {
            var createdHoldingDto = await _holdingsApp.PostHoldingDTO(holdingDto);
            return CreatedAtAction(nameof(Get), new { id = createdHoldingDto.Id}, createdHoldingDto);
        }

        //Put holdings/1
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, HoldingDTO holdingDto)
        {
            holdingDto.Id = id;
            var updatedHoldingDto = await _holdingsApp.PutHoldingDTO(holdingDto);
            if (updatedHoldingDto == null)
                return NotFound();
            return Ok(updatedHoldingDto);
        }

        //Delete holdings/1
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var deleteSuccess = await _holdingsApp.DeleteHolding(id);
            if (!deleteSuccess)
                return NotFound();
            return Ok();
        }
    }
}
