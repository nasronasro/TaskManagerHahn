using Microsoft.EntityFrameworkCore;

namespace ProjectTasksManager.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task Create(Models.Task task);
        Task Delete(Models.Task task);
        Task<Models.Task?> GetTask(int id);
        Task<ICollection<Models.Task>> GetAllTasks(int projectId);
        public void Update(Models.Task task);

    }
}
