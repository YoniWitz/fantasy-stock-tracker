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
        public async Task<ActionResult<IEnumerable<Holding>>> Get()
        {
            var holdings = await _holdingsApp.GetHoldings();
            return Ok(holdings);
        }

        //Get holdings/1
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<Holding>> Get(int id)
        {
            var holding = await _holdingsApp.GetHolding(id);
            return Ok(holding);
        }

        //Post holdings
        [HttpPost]
        public async Task<ActionResult<Holding>> Post(Holding holding)
        {
            await _holdingsApp.PostHolding(holding);
            return CreatedAtAction(nameof(Get), new { id = holding.Id }, holding);
        }

        //Put holdings/1
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Holding holding)
        {
            holding.Id = id;
            var updatedHolding = await _holdingsApp.PutHolding(holding);
            if (updatedHolding == null)
                return NotFound();
            return Ok(updatedHolding);
        }

        //Delete holdings/1
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var deleteSuccess = await _holdingsApp.DeleteHolding(id);
            if (!deleteSuccess)
                return NotFound();
            return Ok();
        }
    }
}
