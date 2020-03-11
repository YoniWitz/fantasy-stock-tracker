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
            var holdingsDTOs = await _context.Holdings.Select(x => HoldingToDTO(x)).ToListAsync();
            return holdingsDTOs;
        }

        public async Task<HoldingDTO> GetHolding(Guid id)
        {
            var holding = await _context.Holdings.FindAsync(id);
            if (holding == null) return null;
            return HoldingToDTO(holding);
        }

        public async Task<HoldingDTO> PostHolding(HoldingDTO holdingDTO)
        {
            var holding = new Holding
            {
                Id = holdingDTO.Id,
                Name = holdingDTO.Name
            };

            _context.Holdings.Add(holding);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return HoldingToDTO(holding);
            else return null;
        }

        public async Task<HoldingDTO> PutHolding(HoldingDTO holdingDTO)
        {
            var currentHolding = await _context.Holdings.FindAsync(holdingDTO.Id);
            if (currentHolding == null)
            {
                return new HoldingDTO { Message = "Holding not found" };
            }

            currentHolding.Name = holdingDTO.Name ?? currentHolding.Name;

            var success = await _context.SaveChangesAsync() > 0;
            if (success) return HoldingToDTO(currentHolding);
            else return new HoldingDTO { Message = "Error updating holding" };
        }

        public async Task<bool> DeleteHolding(Guid id)
        {
            var holding = await _context.Holdings.FindAsync(id);
            if (holding == null)
                return false;

            _context.Holdings.Remove(holding);
            var success = await _context.SaveChangesAsync() > 0;
            if (success) return true;
            return false;
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