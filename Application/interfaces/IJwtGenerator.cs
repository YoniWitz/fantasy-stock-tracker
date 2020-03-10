using FantasyStockTracker.Models;

namespace FantasyStockTracker.Application.interfaces
{
    public interface IJwtGenerator
    {
         string CreateToken(User user);
    }
}