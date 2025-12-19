
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Tests.Controllers;

// Using C# 14 Primary Constructor for the Test Class
public class UserControllerTests()
{
    private readonly IUserService _userService = Substitute.For<IUserService>();
    private readonly ITokenService _tokenService = Substitute.For<ITokenService>();

    // Helper to create the Controller instance (SUT)
    private UserController CreateSut() => new(_userService, _tokenService);

    [Fact]
    public async System.Threading.Tasks.Task Register_ShouldReturnCreatedAtAction_WhenUserIsCreatedSuccessfully()
    {
        // 1. Arrange
        var sut = CreateSut();
        var userDto = new UserCreateDto
        {
            Email = "test@example.com",
            Password = "SecurePassword123",
            ConfirmPassword = "SecurePassword123"
        };

        var createdUser = new User // Mocked return value
        {
            Id = 1,
            Email = "test@example.com"
        };

        // Setup Mock using NSubstitute
        _userService.AddUser(Arg.Any<User>()).Returns(System.Threading.Tasks.Task.FromResult(createdUser));

        // 2. Act
        var result = await sut.Register(userDto);

        // 3. Assert
        var actionResult = result.Should().BeOfType<CreatedAtActionResult>().Subject;
        var responseDto = actionResult.Value.Should().BeOfType<UserResponseDto>().Subject;

        responseDto.Id.Should().Be(createdUser.Id);
        responseDto.Email.Should().Be(createdUser.Email);
        actionResult.ActionName.Should().Be("GetUser");
    }

    [Fact]
    public async System.Threading.Tasks.Task Register_ShouldReturnBadRequest_WhenServiceThrowsArgumentException()
    {
        // 1. Arrange
        var sut = CreateSut();
        var userDto = new UserCreateDto { Email = "duplicate@test.com", Password = "password", ConfirmPassword = "password" };

        string errorMessage = "Email already exists";
        _userService.AddUser(Arg.Any<User>())
            .ThrowsAsync(new ArgumentException(errorMessage));

        // 2. Act
        var result = await sut.Register(userDto);

        // 3. Assert
        result.Should().BeOfType<BadRequestObjectResult>();
    }

    [Fact]
    public async Task Login_ShouldReturnOk_WithValidToken_WhenCredentialsAreCorrect()
    {
        // 1. Arrange
        var sut = CreateSut();
        var loginDto = new UserDto { Email = "test@test.com", Password = "password" };
        var mockToken = "fake-jwt-token";
        var mockUser = new User { Id = 1, Email = "test@test.com" };

        _userService.Authenticate(loginDto.Email, loginDto.Password).Returns(mockToken);

        // Mocking the token validation and user lookup
        var principal = Substitute.For<System.Security.Claims.ClaimsPrincipal>();
        principal.FindFirst("UserId").Returns(new System.Security.Claims.Claim("UserId", "1"));

        _tokenService.ValidateToken(mockToken).Returns(principal);
        _userService.GetUserById(1).Returns(mockUser);

        var result = await sut.Login(loginDto);

        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        var response = okResult.Value.Should().BeOfType<LoginResponseDto>().Subject;

        response.Token.Should().Be(mockToken);
        response.User.Email.Should().Be(mockUser.Email);
    }
}