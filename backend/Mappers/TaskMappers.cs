using System.Collections.ObjectModel;
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
        public static TaskDto MapTaskToTaskDto(Models.Task entity)
        {
            return new TaskDto
            {
                Id = entity.Id,
                Title = entity.Title,
                Description = entity.Description,
                DueDate = entity.DueDate,
                Completed = entity.Completed,
                ProjectId = entity.ProjectId
            };
        }

        public static ICollection<TaskDto> MapTasksToTaskDtos(ICollection<Models.Task> entities)
        {
            ICollection<TaskDto> tdos = new List<TaskDto>();
            foreach(var entity in entities)
            {
                tdos.Add(MapTaskToTaskDto(entity));
            }
            return tdos;
        }
    }
}
