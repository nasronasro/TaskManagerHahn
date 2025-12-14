using ProjectTasksManager.Data;
using ProjectTasksManager.Models;
using ProjectTasksManager.Repositories;
using ProjectTasksManager.Repositories.Interfaces;
using ProjectTasksManager.Services.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository projectRepository;
        private readonly IUnitOfWork unitOfWork;

        public ProjectService(IProjectRepository projectRepository, IUnitOfWork unitOfWork)
        {
            this.projectRepository = projectRepository;
            this.unitOfWork = unitOfWork;
        }

        public async Task AddProject(Project project)
        {
            if (await projectRepository.checkProjectExist(project.Title))
               throw new ArgumentException("This project title alreay exist!");

             await projectRepository.create(project);
        }

        public async Task<List<Project>> GetAllProjects(User user)
        {
            return await projectRepository.GetAll(user);
        }
    }
}
