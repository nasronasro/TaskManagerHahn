using Microsoft.EntityFrameworkCore;
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

        public async Task Delete(Models.Task task)
        {
            dbContext.Tasks.Remove(task);
            await Task.CompletedTask;
        }
        public async Task<Models.Task?> GetTask(int id) {
            return await dbContext.Tasks.Where(t => t.Id == id).FirstOrDefaultAsync();
        }
    }
}
