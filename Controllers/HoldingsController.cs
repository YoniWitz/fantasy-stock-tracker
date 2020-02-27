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
       [HttpGet]
        public async Task<ActionResult<IEnumerable<Holding>>> Get()
        {
            var holdings = await _holdingsApp.GetHoldings();
            return Ok(holdings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Holding>> Get(int id)
        {
            var holding = await _holdingsApp.GetHolding(id);
            return Ok(holding);
        }
    }
}
