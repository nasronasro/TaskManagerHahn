using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using ProjectTasksManager.DTOs.Task;

namespace ProjectTasksManager.Tests.Controllers;

public class TaskControllerTests
{
    private readonly ITaskService _taskService = Substitute.For<ITaskService>();

    private TaskController CreateSut(string email = "worker@company.com")
    {
        var controller = new TaskController(_taskService);

        // AAA Pattern: Setup Mock User Claims for [Authorize]
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
    public async System.Threading.Tasks.Task Create_ReturnsCreated_WhenTaskIsValid()
    {
        // Arrange
        var sut = CreateSut();
        var dto = new TaskCreateDto { Title = "Write Unit Tests", ProjectId = 1, DueDate = DateTime.UtcNow };

        // Act
        var result = await sut.Create(dto);

        // Assert
        result.Should().BeOfType<CreatedResult>();
        await _taskService.Received(1).AddTask(Arg.Any<Models.Task>(), "worker@company.com");
    }

    [Fact]
    public async System.Threading.Tasks.Task Create_ReturnsNotFound_WhenProjectDoesNotExist()
    {
        // Arrange
        var sut = CreateSut();
        var dto = new TaskCreateDto { Title = "Ghost Task", ProjectId = 999, DueDate = DateTime.UtcNow };

        _taskService.AddTask(Arg.Any<Models.Task>(), Arg.Any<string>())
            .ThrowsAsync(new KeyNotFoundException("Project not found"));

        // Act
        var result = await sut.Create(dto);

        // Assert
        result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async System.Threading.Tasks.Task Delete_ReturnsNoContent_WhenSuccessful()
    {
        // Arrange
        var sut = CreateSut();
        int taskId = 10;

        // Act
        var result = await sut.Delete(taskId);

        // Assert
        result.Should().BeOfType<NoContentResult>();
        await _taskService.Received(1).DeleteTask(taskId);
    }

    [Fact]
    public async System.Threading.Tasks.Task GetAll_ReturnsOk_WithTasks()
    {
        // Arrange
        var sut = CreateSut();
        int projectId = 1;
        ICollection<Models.Task> mockTasks = [
            new() { Id = 1, Title = "Task 1" },
            new() { Id = 2, Title = "Task 2" }
        ];

        _taskService.GetAllTasks(projectId).Returns(mockTasks);

        // Act
        var result = await sut.GetAll(projectId);

        // Assert
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        var items = okResult.Value.Should().BeAssignableTo<IEnumerable<TaskDto>>().Subject;
        items.Should().HaveCount(2);
    }

    [Fact]
    public async System.Threading.Tasks.Task UpdateStatus_ReturnsNoContent_OnSuccess()
    {
        // Arrange
        var sut = CreateSut();
        int taskId = 5;

        // Act
        var result = await sut.UpdateStatus(taskId);

        // Assert
        result.Should().BeOfType<NoContentResult>();
        await _taskService.Received(1).UpdateTaskState(taskId);
    }
}