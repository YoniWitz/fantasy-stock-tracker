using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FantasyStockTracker.Application.interfaces;
using FantasyStockTracker.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FantasyStockTracker.Infrasctructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        private readonly SymmetricSecurityKey _key;

        public JwtGenerator(IConfiguration config)
        {
            _key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

       
        public string CreateToken(User user)
        {
            var claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            //generate signing credentials
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}