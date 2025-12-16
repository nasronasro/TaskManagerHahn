using ProjectTasksManager.DTOs.Project;
using ProjectTasksManager.Models;

namespace ProjectTasksManager.Mappers
{
    public class ProjectMappers
    {
        public static Project MapProjectCreateDtoToProject(ProjectCreateDto dto)
        {
            return new Project
            {
                Title = dto.Title,
                Description = dto.Description,
            };

        }
        public static ProjectDto MapProjectToProjectDto(Project entity)
        {
            return new ProjectDto
            {
                Id = entity.Id,
                Title = entity.Title,
                Description = entity.Description,
            };
        }
        public static ICollection<ProjectDto> MapProjectsToProjectDtos(ICollection<Project> entities)
        {
            ICollection<ProjectDto> dtos = new List<ProjectDto>();

            foreach(Project entity in entities)
            {
                dtos.Add(MapProjectToProjectDto(entity));
            }
            return dtos;
        }
    }
}
