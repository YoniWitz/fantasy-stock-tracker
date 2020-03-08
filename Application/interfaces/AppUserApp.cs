using System;
using System.Threading.Tasks;
using FantasyStockTracker.Models;
using FantasyStockTracker.Models.DTOs;
using Microsoft.AspNetCore.Identity;

namespace FantasyStockTracker.Application.interfaces
{
    public class AppUserApp : IAppUserApp
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AppUserApp(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<AppUserDTO> GetAppUserDTO(AppUserDTO appUserDto)
        {
            var appUser = await _userManager.FindByEmailAsync(appUserDto.Email);

            var result = await _signInManager.CheckPasswordSignInAsync(appUser, appUserDto.Password, false);

            if (result.Succeeded)
            {
                //TODO
                return AppUserToDTO(appUser);
            }
            return null;
        }

        private static AppUserDTO AppUserToDTO(AppUser user) =>
             new AppUserDTO
             {
                 Email = user.Email
             };

        private bool _disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _userManager.Dispose();
                    //_signInManager.Dispose();
                }
            }
            _disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}