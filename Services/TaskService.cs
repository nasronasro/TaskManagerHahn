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
        public async Task AddTask(Models.Task task, string userEmail)
        {
            task.Project = await projectRepository.GetOne(task.ProjectId, userEmail);
            if (task.Project == null)                 
                throw new KeyNotFoundException($"The Project associated with Task ID {task.Id} could not be found.");

            await taskRepository.Create(task);
            await unitOfWork.CommitAsync();
        }

        public async Task DeleteTask(int taskId)
        {
            Models.Task? task = await taskRepository.GetTask(taskId);

            if (task == null) throw new ArgumentException("this task doesn't exist");
            
            await taskRepository.Delete(task);
            await unitOfWork.CommitAsync();
        }
    }
}
