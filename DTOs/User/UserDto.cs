using System.ComponentModel.DataAnnotations;

namespace ProjectTasksManager.DTOs.User
{
    public class UserDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public required string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public required string Password { get; set; }
    }
}
