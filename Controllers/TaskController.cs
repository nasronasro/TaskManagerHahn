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
             
        }
    }
}
