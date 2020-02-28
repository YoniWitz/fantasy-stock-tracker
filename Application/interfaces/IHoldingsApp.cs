using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FantasyStockTracker.Models;

namespace FantasyStockTracker.Application.interfaces
{
    public interface IHoldingsApp : IDisposable
    {     
        Task<List<HoldingDTO>> GetHoldings();
        Task<HoldingDTO> GetHolding(int id);
        Task<int> PostHolding(HoldingDTO holdingDTO);
        Task<HoldingDTO> PutHolding(HoldingDTO holdingDTO);
        Task<bool> DeleteHolding(int id);
    }
}