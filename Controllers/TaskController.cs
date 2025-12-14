using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectTasksManager.DTOs.Task;
using ProjectTasksManager.Mappers;
using ProjectTasksManager.Services.Interfaces;

namespace ProjectTasksManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
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
        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetAll(int projectId)
        {
            try
            {
                ICollection<Models.Task> tasks = await taskService.GetAllTasks(projectId);
                
                return Ok(TaskMappers.MapTasksToTaskDtos(tasks));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected server error occurred during Fetching Tasks." });
            }
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateStatus(int id)
        {
            try
            {
                await taskService.UpdateTaskState(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected server error occurred during updating a Task." });
            }
        }
    }
}
