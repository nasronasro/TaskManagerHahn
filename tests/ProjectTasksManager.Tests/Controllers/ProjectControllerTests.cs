using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using ProjectTasksManager.DTOs.Project;

namespace ProjectTasksManager.Tests.Controllers;

public class ProjectControllerTests
{
    private readonly IProjectService _projectService = Substitute.For<IProjectService>();
    private readonly ITaskService _taskService = Substitute.For<ITaskService>();

    private ProjectController CreateSut(string email = "test@example.com")
    {
        var controller = new ProjectController(_projectService, _taskService);

        // Mocking the User (ClaimsPrincipal)
        var claims = new List<Claim> { new(ClaimTypes.Email, email) };
        var identity = new ClaimsIdentity(claims, "TestAuth");
        var principal = new ClaimsPrincipal(identity);

        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = principal }
        };

        return controller;
    }

    [Fact]
    public async Task CreatePost_ReturnsOk_WhenProjectIsValid()
    {
        // Arrange
        var sut = CreateSut();
        var dto = new ProjectCreateDto { Title = "New Project" };

        // Act
        var result = await sut.CreatePost(dto);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        await _projectService.Received(1).AddProject(Arg.Any<Project>(), "test@example.com");
    }

    [Fact]
    public async Task GetAll_ReturnsMappedDtos_WhenProjectsExist()
    {
        // Arrange
        var sut = CreateSut("user@test.com");
        var projects = new List<Project>
        {
            new() { Id = 1, Title = "P1" },
            new() { Id = 2, Title = "P2" }
        };

        _projectService.GetAllProjects("user@test.com").Returns(projects);

        // Act
        var result = await sut.GetAll();

        // Assert
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        var returnedDtos = okResult.Value.Should().BeAssignableTo<IEnumerable<ProjectDto>>().Subject;
        returnedDtos.Should().HaveCount(2);
    }

    [Fact]
    public async Task GetProgress_ReturnsDoubleValue()
    {
        // Arrange
        var sut = CreateSut();
        _taskService.CalculateProgress(1).Returns(75.5);

        // Act
        var result = await sut.GetProgressOfProject(1);

        // Assert
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.Value.Should().Be(75.5);
    }
}