using ProjectTasksManager.DTOs.Task;
using ProjectTasksManager.Models;

namespace ProjectTasksManager.Mappers
{
    public class TaskMappers
    {
        public static Models.Task MapTaskCreateDtoToTask(TaskCreateDto dto)
        {
            return new Models.Task
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                Completed = dto.Completed,
                ProjectId = dto.ProjectId
            };
        }
    }
}
