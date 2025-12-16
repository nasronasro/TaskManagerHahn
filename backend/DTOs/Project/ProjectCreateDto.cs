namespace ProjectTasksManager.DTOs.Project
{
    public class ProjectCreateDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
    }
}
