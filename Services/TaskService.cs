using ProjectTasksManager.Data;
using ProjectTasksManager.Repositories.Interfaces;
using ProjectTasksManager.Services.Interfaces;

namespace ProjectTasksManager.Services
{

    public class TaskService : ITaskService
    {
        private readonly ITaskRepository taskRepository;
        private readonly IProjectRepository projectRepository;
        private readonly IUnitOfWork unitOfWork;
        public TaskService(ITaskRepository taskRepository, IProjectRepository projectRepository, IUnitOfWork unitOfWork) 
        {
            this.taskRepository = taskRepository;
            this.projectRepository = projectRepository;
            this.unitOfWork = unitOfWork;
        }
        public async Task AddTask(Models.Task task, int projectId, string userEmail)
        {
            task.Project = await projectRepository.GetOne(projectId, userEmail);
            if (task.Project == null)                 
                throw new KeyNotFoundException($"The Project associated with Task ID {task.Id} could not be found.");

            await taskRepository.Create(task);
            await unitOfWork.CommitAsync();
        }
    }
}
