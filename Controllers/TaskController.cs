using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using ProjectTasksManager.DTOs.Task;
using ProjectTasksManager.Mappers;
using ProjectTasksManager.Services.Interfaces;

namespace ProjectTasksManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : Controller
    {
        private readonly ITaskService taskService;
        public TaskController(ITaskService taskService)
        {
            this.taskService = taskService;
        }
        [HttpPost]
         public async Task<IActionResult> Create(TaskCreateDto taskDto)
         {
            if (!ModelState.IsValid) return BadRequest();
            try
            {

                string? userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                if (userEmail == null)
                    return Unauthorized();
                await taskService.AddTask(TaskMappers.MapTaskCreateDtoToTask(taskDto), userEmail);
                return Created();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected server error occurred during Creating a Task." });
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                string? userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                if (userEmail == null)
                    return Unauthorized();
                await taskService.DeleteTask(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected server error occurred during Deleting a Task." });
            }
        }
    }
}
