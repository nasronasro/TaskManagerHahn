using ProjectTasksManager.Models;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task AddAsync(User user);
        Task<bool> IsEmailUniqueAsync(string email);
        Task<User?> GetAsyncUser(string email);
    }
}
