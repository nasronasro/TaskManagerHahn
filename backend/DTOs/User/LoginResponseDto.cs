namespace ProjectTasksManager.DTOs.User
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Expires { get; set; }
        public UserResponseDto User { get; set; } = null!;
    }
}
