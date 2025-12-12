using System.ComponentModel.DataAnnotations;

namespace ProjectTasksManager.DTOs.User
{
    public class UserCreateDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public required string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public required string Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public required string ConfirmPassword { get; set; }
    }
}
