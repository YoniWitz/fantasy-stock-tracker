using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FantasyStockTracker.Models.DTOs;

namespace FantasyStockTracker.Application.interfaces
{
    public interface IHoldingsApp : IDisposable
    {     
        Task<List<HoldingDTO>> GetHoldings();
        Task<HoldingDTO> GetHolding(Guid id);
        Task<HoldingDTO> PostHolding(HoldingDTO holdingDTO);
        Task<HoldingDTO> PutHolding(HoldingDTO holdingDTO);
        Task<bool> DeleteHolding(Guid id);
    }
}