using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FantasyStockTracker.Models;

namespace FantasyStockTracker.Application.interfaces
{
    public interface IHoldingsApp : IDisposable
    {     
        Task<List<HoldingDTO>> GetHoldings();
        Task<HoldingDTO> GetHolding(Guid id);
        Task<Guid> PostHolding(HoldingDTO holdingDTO);
        Task<HoldingDTO> PutHolding(HoldingDTO holdingDTO);
        Task<bool> DeleteHolding(Guid id);
    }
}