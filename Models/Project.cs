namespace ProjectTasksManager.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }        
        public string Description { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}
