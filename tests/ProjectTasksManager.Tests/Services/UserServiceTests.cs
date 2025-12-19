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
}