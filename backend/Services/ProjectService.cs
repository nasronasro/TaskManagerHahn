using ProjectTasksManager.Data;
using ProjectTasksManager.Models;
using ProjectTasksManager.Repositories.Interfaces;
using ProjectTasksManager.Services.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Services
{
    public class ProjectService : IProjectService
    {
        //dependencies inversion respecting the D in Solid
        private readonly IProjectRepository projectRepository;
        private readonly IUserRepository userRepository;
        private readonly IUnitOfWork unitOfWork;

        public ProjectService(IProjectRepository projectRepository,IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            this.projectRepository = projectRepository;
            this.userRepository = userRepository;
            this.unitOfWork = unitOfWork;
        }


        //This Section for Basic Create and Fetching Projects aswell as single project
        #region Basic Crud
        public async Task AddProject(Project project, string userEmail)
        {
            User? user = await userRepository.GetAsyncUser(userEmail);
            if (user == null)
                throw new Exception("Not authorizied");

            if (await projectRepository.checkProjectExist(project.Title))
                throw new ArgumentException("This project title alreay exist!");

            project.UserId = user.Id;  
            await projectRepository.create(project);
            await unitOfWork.CommitAsync();
        }

            public async Task<ICollection<Project>> GetAllProjects(string userEmail)
            {
                User? user = await userRepository.GetAsyncUser(userEmail);

                ICollection<Project> projects =  await projectRepository.GetAll(user);
                

                await unitOfWork.CommitAsync();
                return projects;
        }

        public async Task<Project> GetProject(int id, string userEmail)
        {
            Project? project = await projectRepository.GetOne(id, userEmail);
            if (project == null)
                throw new KeyNotFoundException($"The project of id: {id} not found");

            await unitOfWork.CommitAsync();
            return project;
        }
        #endregion
    }
}
