using System;
using System.Threading.Tasks;
using FantasyStockTracker.Models.DTOs;

namespace FantasyStockTracker.Application.interfaces
{
    public interface IAppUserApp : IDisposable
    {
        Task<AppUserDTO> GetAppUserDTO(AppUserDTO appUserDTO);
    }
}