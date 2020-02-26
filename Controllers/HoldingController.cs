using System.Collections.Generic;
using System.Threading.Tasks;
using FantasyStockTracker.Models;
using FantasyStockTracker.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FantasyStockTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HoldingController : ControllerBase
    {
        public HoldingController(DataContext context)
        {
            _context = context;
        }
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

      //  private readonly ILogger<HoldingController> _logger;
        private readonly DataContext _context;

        // public HoldingController(ILogger<HoldingController> logger)
        // {
        //     _logger = logger;
        // }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Holding>>> Get()
        {
            var holdings = await _context.Holdings.ToListAsync();
            return Ok(holdings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Holding>> Get(int id)
        {
            var holding = await _context.Holdings.FindAsync(id);
            return Ok(holding);
        }
    }
}
