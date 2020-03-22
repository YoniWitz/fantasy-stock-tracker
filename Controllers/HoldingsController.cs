using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FantasyStockTracker.Application.interfaces;
using FantasyStockTracker.Models;
using FantasyStockTracker.Models.DTOs;
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
            var holdingsDTOs = await _holdingsApp.GetHoldings();
            return Ok(holdingsDTOs);
        }

        //Get holdings/1
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<HoldingDTO>> Get(Guid id)
        {
            var holdingDTO = await _holdingsApp.GetHolding(id);
            if (holdingDTO == null)
                return NotFound();

            return Ok(holdingDTO);
        }

        //Post holdings
        [HttpPost]
        public async Task<ActionResult> Post(HoldingDTO holdingDTO)
        {
            var createdHoldingDTO = await _holdingsApp.PostHolding(holdingDTO);

            if (createdHoldingDTO == null) return BadRequest("Error creating new holding");
            else return CreatedAtAction(nameof(Get), new { id = createdHoldingDTO.Id }, createdHoldingDTO);
        }

        //Put holdings/1
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, HoldingDTO holdingDTO)
        {
            holdingDTO.Id = id;
            var updatedHoldingDTO = await _holdingsApp.PutHolding(holdingDTO);

            if (updatedHoldingDTO.Message != null)
                return BadRequest(updatedHoldingDTO.Message);

            return Ok(updatedHoldingDTO);
        }

        //Delete holdings/1
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var deleteSuccess = await _holdingsApp.DeleteHolding(id);

            if (!deleteSuccess)
                return BadRequest("Error deleting holding");

            return Ok();
        }
    }
}
