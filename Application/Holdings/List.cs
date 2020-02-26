using System.Collections.Generic;
using System.Threading.Tasks;
using FantasyStockTracker.Models;
using FantasyStockTracker.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FantasyStockTracker.Application.Holdings
{
    public class List
    {
        private readonly DataContext _context;
        public List(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Holding>> getHoldings(){
            var holdings = await _context.Holdings.ToListAsync();
            return holdings;
        }
    }
}