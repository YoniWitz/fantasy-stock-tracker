using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FantasyStockTracker.Models;

namespace FantasyStockTracker.Application.interfaces
{
    public interface IHoldingsApp : IDisposable
    {     
        Task<List<Holding>> GetHoldings();
        Task<Holding> GetHolding(int id);
        Task<bool> PostHolding(Holding holding);
    }
}