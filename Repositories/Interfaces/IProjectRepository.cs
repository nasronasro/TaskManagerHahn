using ProjectTasksManager.Models;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Repositories.Interfaces
{
    public interface IProjectRepository
    {
        Task create(Project project);
    }
}
