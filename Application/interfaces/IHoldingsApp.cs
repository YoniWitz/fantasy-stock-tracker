using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FantasyStockTracker.Models;

namespace FantasyStockTracker.Application.interfaces
{
    public interface IHoldingsApp : IDisposable
    {     
        Task<List<HoldingDTO>> GetHoldingsDTOs();
        Task<HoldingDTO> GetHoldingDTO(Guid id);
        Task<HoldingDTO> PostHoldingDTO(HoldingDTO holdingDTO);
        Task<HoldingDTO> PutHoldingDTO(HoldingDTO holdingDTO);
        Task<bool> DeleteHolding(Guid id);
    }
}