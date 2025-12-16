namespace ProjectTasksManager.Data
{
    public interface IUnitOfWork : IDisposable
    {
        Task<int> CommitAsync();
    }
}
