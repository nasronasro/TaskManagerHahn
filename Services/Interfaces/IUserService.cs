using ProjectTasksManager.Models;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> AddUser(User user);
        Task<string> Authenticate(string email, string password);
        Task<User?> GetUserById(int id);

    }
}
