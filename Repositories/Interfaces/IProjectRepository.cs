using ProjectTasksManager.Models;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Repositories.Interfaces
{
    public interface IProjectRepository
    {
        Task create(Project project);
        Task<bool> checkProjectExist(string Title);
        Task<List<Project>> GetAll(User user);
    }
}
