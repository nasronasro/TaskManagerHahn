using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectTasksManager.DTOs.User;
using ProjectTasksManager.Mappers;
using ProjectTasksManager.Services.Interfaces;

namespace ProjectTasksManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public UserController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserCreateDto userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = UserMappers.MapUserCreateDtoToUser(userDto);

            try
            {
                var createdUser = await _userService.AddUser(user);

                var response = new UserResponseDto
                {
                    Id = createdUser.Id,
                    Email = createdUser.Email
                };

                return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected server error occurred during registration." });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var token = await _userService.Authenticate(loginDto.Email, loginDto.Password);
                var user = await _userService.GetUserById(int.Parse(
                    _tokenService.ValidateToken(token)?.FindFirst("UserId")?.Value ?? "0"));

                if (user == null)
                    return Unauthorized();

                var response = new LoginResponseDto
                {
                    Token = token,
                    Expires = DateTime.UtcNow.AddMinutes(60),
                    User = new UserResponseDto
                    {
                        Id = user.Id,
                        Email = user.Email
                    }
                };

                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                return Unauthorized(new { Error = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected server error occurred during login." });
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _userService.GetUserById(id);

                if (user == null)
                    return NotFound(new { Error = "User not found." });

                var response = new UserResponseDto
                {
                    Id = user.Id,
                    Email = user.Email
                };

                return Ok(response);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Error = "An unexpected server error occurred." });
            }
        }
    }
}