using System.Security.Claims;
using ProjectTasksManager.Models;

namespace ProjectTasksManager.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
        ClaimsPrincipal? ValidateToken(string token);
    }
}
