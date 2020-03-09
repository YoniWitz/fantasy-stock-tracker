using System;
using System.Threading.Tasks;
using FantasyStockTracker.Models.DTOs;

namespace FantasyStockTracker.Application.interfaces
{
    public interface IUsersApp : IDisposable
    {
        Task<UserDTO> Login(UserDTO userDTO);
    }
}