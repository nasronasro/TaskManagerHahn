namespace ProjectTasksManager.DTOs.Project
{
    public class ProjectDto
    {
        public required int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
    }
}
