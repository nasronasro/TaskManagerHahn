using ProjectTasksManager.DTOs.Project;
using ProjectTasksManager.Models;

namespace ProjectTasksManager.Mappers
{
    public class ProjectMappers
    {
        public static Project MapProjectCreateDtoToProject(ProjectCreateDto dto,User user)
        {
            return new Project
            {
                Title = dto.Title,
                Description = dto.Description,
                User = user
            };

        }
    }
}
