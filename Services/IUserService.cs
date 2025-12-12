using ProjectTasksManager.Models;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Services
{
    public interface IUserService
    {
        Task AddUser(User user);
        Task<User?> GetUser(User user);
    }
}
