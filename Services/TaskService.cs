using Microsoft.EntityFrameworkCore;
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

        public async Task<int> CountTotalTasksInProject(int projectId)
        {
            var tasks = await taskRepository.GetAllTasks(projectId);
            int count = tasks.Count;
            return count;
        }
        public async Task<int> CountTotalCompletedTasksInProject(int projectId)
        {
            var tasks = await taskRepository.GetAllTasks(projectId);
            int count = tasks.Where(t=>t.Completed == true).Count();
            return count;
        }
        public async Task<double> CalculateProgress(int projectId)
        {
            if (await CountTotalTasksInProject(projectId) == 0)
                throw new ArithmeticException("There is no tasks to count Progress");

            int total = await CountTotalTasksInProject(projectId);
            int completed = await CountTotalCompletedTasksInProject(projectId);
            double progress = (double)completed / total;
            return progress;
        }


        public async Task DeleteTask(int taskId)
        {
            Models.Task? task = await taskRepository.GetTask(taskId);

            if (task == null) throw new ArgumentException("this task doesn't exist");
            
            await taskRepository.Delete(task);
            await unitOfWork.CommitAsync();
        }

        public async Task<ICollection<Models.Task>> GetAllTasks(int projectId)
        {
            ICollection<Models.Task> tasks = await taskRepository.GetAllTasks(projectId);
            if (tasks.Count == 0)
                throw new KeyNotFoundException("No Key found");

            await unitOfWork.CommitAsync();
            return tasks;
        }

        public async Task UpdateTaskState(int taskId)
        {
            Models.Task? task = await taskRepository.GetTask(taskId);
            if (task == null || task.Completed)
                throw new KeyNotFoundException($"The Project associated with Task ID {taskId} could not be found.");

            task.Completed = true;
            await unitOfWork.CommitAsync();
        }
    }
}
