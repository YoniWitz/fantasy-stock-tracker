using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FantasyStockTracker.Application.interfaces;
using FantasyStockTracker.Models;
using FantasyStockTracker.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FantasyStockTracker.Application
{
    public class HoldingsApp : IHoldingsApp
    {
        private readonly DataContext _context;
        public HoldingsApp(DataContext context)
        {
            _context = context;
        }

        public async Task<List<HoldingDTO>> GetHoldings()
        {
            var holdingDTO = await _context.Holdings.Select(x => HoldingToDTO(x)).ToListAsync();
            return holdingDTO;
        }

        public async Task<HoldingDTO> GetHolding(Guid id)
        {
            var holdingDTO = await _context.Holdings.Where(x => x.Id == id).Select(x => HoldingToDTO(x)).SingleAsync();
            return holdingDTO;
        }

        public async Task<Guid> PostHolding(HoldingDTO holdingDTO)
        {
            var holding = new Holding
            {
                Id = holdingDTO.Id,
                Name = holdingDTO.Name
            };

            _context.Holdings.Add(holding);
            var success = await _context.SaveChangesAsync() > 0;
            if (success) return holding.Id;
            else throw new Exception("Problem creating holding");
        }

        public async Task<HoldingDTO> PutHolding(HoldingDTO holdingDTO)
        {
            var currentHolding = await _context.Holdings.FindAsync(holdingDTO.Id);
            if (currentHolding == null)
            {
                return null;
            }

            currentHolding.Name = holdingDTO.Name ?? currentHolding.Name;

            var success = await _context.SaveChangesAsync() > 0;
            if (success) return HoldingToDTO(currentHolding);
            else throw new Exception("Problem saving changes to holding");
        }

        public async Task<bool> DeleteHolding(Guid id)
        {
            var holding = await _context.Holdings.FindAsync(id);
            if (holding == null)
                return false;

            _context.Holdings.Remove(holding);
            var success = await _context.SaveChangesAsync() > 0;
            if (success) return true;
            throw new Exception("error deleting holding");
        }

        private bool _disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private static HoldingDTO HoldingToDTO(Holding holding) =>
       new HoldingDTO
       {
           Id = holding.Id,
           Name = holding.Name
       };
    }
}