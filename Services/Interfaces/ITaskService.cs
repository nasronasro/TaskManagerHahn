namespace ProjectTasksManager.Services.Interfaces
{
    public interface ITaskService
    {
        Task AddTask(Models.Task task, string userEmail);
        Task DeleteTask(int taskId);
        Task<ICollection<Models.Task>> GetAllTasks(int projectId);
        Task UpdateTaskState(int taskId);
        Task<int> CountTotalTasksInProject(int projectId);
        Task<int> CountTotalCompletedTasksInProject(int projectId);
        Task<double> CalculateProgress(int projectId);
    }
}
