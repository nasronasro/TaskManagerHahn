using ProjectTasksManager.Models;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Services.Interfaces
{
    public interface IUserService
    {
        Task AddUser(User user);
        Task<User?> GetUser(User user);
        
    }
}
