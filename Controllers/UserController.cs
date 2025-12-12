
using Microsoft.AspNetCore.Mvc;
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

    }
}
