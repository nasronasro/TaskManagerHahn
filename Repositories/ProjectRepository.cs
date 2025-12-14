using Microsoft.EntityFrameworkCore;
using ProjectTasksManager.Data;
using ProjectTasksManager.Models;
using ProjectTasksManager.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext dbContext;
        public ProjectRepository(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> checkProjectExist(string Title)
        {
            return await dbContext.Projects.AnyAsync(p => p.Title == Title);
        }

        public async Task create(Project project)
        {
            await dbContext.Projects.AddAsync(project);
        }
    }
}
