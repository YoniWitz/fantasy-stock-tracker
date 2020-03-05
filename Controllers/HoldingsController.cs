using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FantasyStockTracker.Application;
using FantasyStockTracker.Models;
using Microsoft.AspNetCore.Mvc;

namespace FantasyStockTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HoldingsController : ControllerBase
    {
        private readonly HoldingsApp _holdingsApp;

        public HoldingsController(HoldingsApp holdingsApp)
        {
            _holdingsApp = holdingsApp;
        }

        //Get holdings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HoldingDTO>>> Get()
        {
            var holdingDTOs = await _holdingsApp.GetHoldings();
            return Ok(holdingDTOs);
        }

        //Get holdings/1
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<HoldingDTO>> Get(Guid id)
        {
            var holdingDTO = await _holdingsApp.GetHolding(id);
            return Ok(holdingDTO);
        }

        //Post holdings
        [HttpPost]
        public async Task<ActionResult> Post(HoldingDTO holdingDTO)
        {
            var id = await _holdingsApp.PostHolding(holdingDTO);
            return CreatedAtAction(nameof(Get), new { id = id}, holdingDTO);
        }

        //Put holdings/1
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, HoldingDTO holdingDTO)
        {
            holdingDTO.Id = id;
            var updatedHoldingDTO = await _holdingsApp.PutHolding(holdingDTO);
            if (updatedHoldingDTO == null)
                return NotFound();
            return Ok(updatedHoldingDTO);
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
