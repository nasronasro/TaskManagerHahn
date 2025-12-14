using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectTasksManager.DTOs.Project;
using ProjectTasksManager.Mappers;
using ProjectTasksManager.Models;
using ProjectTasksManager.Services.Interfaces;

namespace ProjectTasksManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProjectController : Controller
    {
        private readonly IProjectService projectService;
        public ProjectController(IProjectService projectService)
        {
            this.projectService = projectService;
        }
        
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> CreatePost(ProjectCreateDto projectDto)
        {
            if (!ModelState.IsValid) return BadRequest();
            try
            {
                var project = ProjectMappers.MapProjectCreateDtoToProject(projectDto);
                string? UserEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                if (UserEmail == null)
                    return Unauthorized();
                await projectService.AddProject(project, UserEmail);
                return Ok(projectDto);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(new { ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new ProblemDetails
                    {
                        Status = StatusCodes.Status500InternalServerError,
                        Title = "An internal server error occurred while creating the project.",
                        Detail = ex.Message
                    }
                );
            }

        }
        
    }
}
