using ProjectTasksManager.Data;
using ProjectTasksManager.Repositories.Interfaces;
using ProjectTasksManager.Services;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Tests.Services;

public class UserServiceTests
{
    private readonly IUserRepository _userRepository = Substitute.For<IUserRepository>();
    private readonly IUnitOfWork _unitOfWork = Substitute.For<IUnitOfWork>();
    private readonly ITokenService _tokenService = Substitute.For<ITokenService>();
    
    // System Under Test (SUT)
    private UserService CreateSut() => new(_userRepository, _unitOfWork, _tokenService);

    [Fact]
    public async Task AddUser_ShouldHashPasswordAndSave_WhenEmailIsUnique()
    {
        // Arrange
        var sut = CreateSut();
        var rawPassword = "MySecurePassword123";
        var user = new User { Email = "newuser@test.com", Password = rawPassword };

        // Mock: Email is unique (returns true)
        _userRepository.IsEmailUniqueAsync(user.Email).Returns(true);

        // Act
        var result = await sut.AddUser(user);

        result.Password.Should().NotBe(rawPassword);
        
        // Verify Repository and UnitOfWork were called
        await _userRepository.Received(1).AddAsync(Arg.Is<User>(u => u.Email == user.Email));
        await _unitOfWork.Received(1).CommitAsync();
    }

    [Fact]
    public async Task AddUser_ShouldThrowArgumentException_WhenEmailAlreadyExists()
    {
        // Arrange
        var sut = CreateSut();
        var user = new User { Email = "duplicate@test.com", Password = "any" };

        // Mock: Email already exists (returns false)
        _userRepository.IsEmailUniqueAsync(user.Email).Returns(false);

        // Act
        var act = () => sut.AddUser(user);

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithMessage($"User with email '{user.Email}' already exists.");
            
        // Verify we never committed if validation failed
        await _unitOfWork.DidNotReceive().CommitAsync();
    }
    [Fact]
    public async Task Authenticate_ShouldReturnToken_WhenCredentialsAreValid()
    {
        // Arrange
        var sut = CreateSut();
        var email = "test@example.com";
        var password = "Password123";
        var hashedPassword = HashPassword(password); // Using your internal hashing logic
        var mockUser = new User { Email = email, Password = hashedPassword };
        var expectedToken = "valid-jwt-token";

        _userRepository.GetAsyncUser(email).Returns(mockUser);
        _tokenService.GenerateToken(mockUser).Returns(expectedToken);

        // Act
        var result = await sut.Authenticate(email, password);

        // Assert
        result.Should().Be(expectedToken);
        await _unitOfWork.Received(1).CommitAsync(); // Verify tracking/updates are saved
    }

    [Fact]
    public async Task Authenticate_ShouldThrowException_WhenUserDoesNotExist()
    {
        // Arrange
        var sut = CreateSut();
        _userRepository.GetAsyncUser("nonexistent@test.com").Returns((User)null!);

        // Act
        var act = () => sut.Authenticate("nonexistent@test.com", "anyPassword");

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithMessage("Invalid credentials.");
    }

    [Fact]
    public async Task Authenticate_ShouldThrowException_WhenPasswordIsIncorrect()
    {
        // Arrange
        var sut = CreateSut();
        var email = "test@example.com";
        var mockUser = new User { Email = email, Password = HashPassword("CorrectPassword") };

        _userRepository.GetAsyncUser(email).Returns(mockUser);

        // Act
        var act = () => sut.Authenticate(email, "WrongPassword");

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithMessage("Invalid credentials.");
    }

    // helper method inside the UserServiceTests class to provide a local HashPassword implementation for testing.
    private string HashPassword(string password)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var hashedBytes = System.Text.Encoding.UTF8.GetBytes(password);
        return Convert.ToBase64String(sha256.ComputeHash(hashedBytes));
    }
}