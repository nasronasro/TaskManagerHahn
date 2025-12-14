namespace ProjectTasksManager.Services.Interfaces
{
    public interface ITaskService
    {
        Task AddTask(Models.Task task, string userEmail);
        Task DeleteTask(int taskId);
        Task<ICollection<Models.Task>> GetAllTasks(int projectId);
    }
}
