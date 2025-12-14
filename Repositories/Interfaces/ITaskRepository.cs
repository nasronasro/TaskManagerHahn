namespace ProjectTasksManager.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task Create(Models.Task task);
        Task Delete(Models.Task task);
        Task<Models.Task?> GetTask(int id);

    }
}
