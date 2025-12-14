using ProjectTasksManager.Data;
using ProjectTasksManager.Repositories.Interfaces;

namespace ProjectTasksManager.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext dbContext;

        public TaskRepository(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task Create(Models.Task task)
        {
            await dbContext.Tasks.AddAsync(task);
        }
    }
}
