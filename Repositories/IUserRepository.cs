using ProjectTasksManager.Models;
namespace ProjectTasksManager.Repositories
{
    public interface IUserRepository
    {
        Task<User> AddAsync(User user);
    }
}
