namespace ProjectTasksManager.DTOs.Task
{
    public class TaskDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required DateTime DueDate { get; set; }
        public bool Completed { get; set; } = false;
        public required int ProjectId { get; set; }
    }
}
