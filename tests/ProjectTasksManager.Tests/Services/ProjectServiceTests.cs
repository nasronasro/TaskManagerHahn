using ProjectTasksManager.Data;
using ProjectTasksManager.Repositories.Interfaces;
using ProjectTasksManager.Services;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Tests.Services;

public class ProjectServiceTests
{
    private readonly IProjectRepository _projectRepo = Substitute.For<IProjectRepository>();
    private readonly IUserRepository _userRepo = Substitute.For<IUserRepository>();
    private readonly IUnitOfWork _uow = Substitute.For<IUnitOfWork>();

    private ProjectService CreateSut() => new(_projectRepo, _userRepo, _uow);

    [Fact]
    public async Task AddProject_ShouldAssignUserIdAndCommit_WhenValid()
    {
        // Arrange
        var sut = CreateSut();
        var userEmail = "owner@test.com";
        var user = new User { Id = 99, Email = userEmail };
        var project = new Project { Title = "New Architecture" };

        _userRepo.GetAsyncUser(userEmail).Returns(user);
        _projectRepo.checkProjectExist(project.Title).Returns(false);

        // Act
        await sut.AddProject(project, userEmail);

        // Assert
        project.UserId.Should().Be(user.Id); // Verify side effect
        await _projectRepo.Received(1).create(project);
        await _uow.Received(1).CommitAsync();
    }

    [Fact]
    public async Task AddProject_ShouldThrowArgumentException_WhenTitleExists()
    {
        // Arrange
        var sut = CreateSut();
        var userEmail = "test@test.com";
        var project = new Project { Title = "Existing Project" };

        _userRepo.GetAsyncUser(userEmail).Returns(new User { Id = 1 });
        _projectRepo.checkProjectExist(project.Title).Returns(true);

        // Act
        var act = async () => await sut.AddProject(project, userEmail);

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithMessage("This project title alreay exist!");
        await _uow.DidNotReceive().CommitAsync();
    }

    [Fact]
    public async Task GetAllProjects_ShouldReturnUserProjects()
    {
        // Arrange
        var sut = CreateSut();
        var userEmail = "dev@test.com";
        var user = new User { Id = 1, Email = userEmail };
        ICollection<Project> mockProjects = [new Project { Id = 1, Title = "P1" }];

        _userRepo.GetAsyncUser(userEmail).Returns(user);
        _projectRepo.GetAll(user).Returns(Task.FromResult(mockProjects.ToList()));

        // Act
        var result = await sut.GetAllProjects(userEmail);

        // Assert
        result.Should().HaveCount(1);
        result.First().Title.Should().Be("P1");
    }
}