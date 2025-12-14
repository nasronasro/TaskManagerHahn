using System.Security.Claims;
using ProjectTasksManager.DTOs.User;
using ProjectTasksManager.Models;

namespace ProjectTasksManager.Mappers
{
    public class UserMappers
    {
        public static User MapUserCreateDtoToUser(UserCreateDto dto)
        {
            return new User
            {
                Email = dto.Email,
                Password = dto.Password
            };
        }
        public static User MapUserDtoToUser(UserDto dto)
        {
            return new User
            {
                Email = dto.Email,
                Password = dto.Password
            };
        }
    }
}
