using System;
using System.Collections.Generic;
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

        public async Task<List<Holding>> GetHoldings()
        {
            var holdings = await _context.Holdings.ToListAsync();
            return holdings;
        }

        public async Task<Holding> GetHolding(int id)
        {
            var holding = await _context.Holdings.FindAsync(id);
            return holding;
        }

        public async Task<bool> PostHolding(Holding holding)
        {
            _context.Holdings.Add(holding);
            var success = await _context.SaveChangesAsync() > 0;
            if (success) return success;
            else throw new Exception("Problem creating holding");
        }

        public async Task<Holding> PutHolding(Holding holding)
        {
            var currentHolding = await _context.Holdings.FindAsync(holding.Id);
            if (currentHolding == null)
            {
                return null;
            }

            currentHolding.Name = holding.Name ?? currentHolding.Name;

            var success = await _context.SaveChangesAsync() > 0;
            if (success) return currentHolding;
            else throw new Exception("Problem saving changes to holding");
        }

         public async Task<bool> DeleteHolding(int id)
        {
            var holding = await _context.Holdings.FindAsync(id);
            if(holding == null)
                return false;
            
            _context.Holdings.Remove(holding);
            var success = await _context.SaveChangesAsync() > 0;
            if(success) return true;
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
    }
}