
using Microsoft.AspNetCore.Mvc;
using ProjectTasksManager.DTOs.User;
using ProjectTasksManager.Mappers;
using ProjectTasksManager.Models;
using ProjectTasksManager.Services;

namespace ProjectTasksManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public IUserService userService;
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserCreateDto userDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            User user = UserMappers.MapUserCreateDtoToUser(userDto);
            try
            {
                await userService.AddUser(user);
                return CreatedAtAction(actionName: "Create a new user", value: userDto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    new { Error = "An unexpected server error occurred during creation." });
            }
        }
    }
}
