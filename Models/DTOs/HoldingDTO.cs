using System;
using System.ComponentModel.DataAnnotations;

namespace FantasyStockTracker.Models.DTOs
{
    public class HoldingDTO
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Message { get; set; }
    }
}