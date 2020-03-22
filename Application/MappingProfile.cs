using AutoMapper;
using FantasyStockTracker.Models;
using FantasyStockTracker.Models.DTOs;

namespace FantasyStockTracker.Application
{
    public class MappingProfile : Profile
    {
        public MappingProfile(){
            CreateMap<Holding, HoldingDTO>();
            
        }
    }
}