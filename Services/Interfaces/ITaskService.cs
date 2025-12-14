namespace ProjectTasksManager.Services.Interfaces
{
    public interface ITaskService
    {
        Task AddTask(Models.Task task, string userEmail);
    }
}
