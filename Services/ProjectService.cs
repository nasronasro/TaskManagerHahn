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
        private readonly IUserRepository userRepository;
        private readonly IUnitOfWork unitOfWork;

        public ProjectService(IProjectRepository projectRepository,IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            this.projectRepository = projectRepository;
            this.userRepository = userRepository;
            this.unitOfWork = unitOfWork;
        }

        public async Task AddProject(Project project, string userEmail)
        {
            User? user = await userRepository.GetAsyncUser(userEmail);
            if (user == null)
                throw new Exception("Not authorizied");

            if (await projectRepository.checkProjectExist(project.Title))
                throw new ArgumentException("This project title alreay exist!");

            project.User = user;  
            await projectRepository.create(project);
        }

        public async Task<List<Project>> GetAllProjects(string userEmail)
        {
            User? user = await userRepository.GetAsyncUser(userEmail);
            if (user == null)
                throw new Exception("Not authorizied");

            return await projectRepository.GetAll(user);
        }
    }
}
