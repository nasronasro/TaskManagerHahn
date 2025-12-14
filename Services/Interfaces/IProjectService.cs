using ProjectTasksManager.Models;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Services.Interfaces
{
    public interface IProjectService
    {
        Task AddProject(Project project);
        Task<List<Project>> GetAllProjects(User user);
    }
}
