namespace ProjectTasksManager.Tests.Services;

public class TaskServiceTests
{
    private readonly ITaskRepository _taskRepo = Substitute.For<ITaskRepository>();
    private readonly IProjectRepository _projectRepo = Substitute.For<IProjectRepository>();
    private readonly IUnitOfWork _uow = Substitute.For<IUnitOfWork>();

    private TaskService CreateSut() => new(_taskRepo, _projectRepo, _uow);

    [Fact]
    public async Task AddTask_ShouldThrowException_WhenProjectNotFound()
    {
        // Arrange
        var sut = CreateSut();
        var task = new Models.Task { ProjectId = 1 };
        _projectRepo.GetOne(1, "test@test.com").Returns((Project)null!);

        // Act
        var act = () => sut.AddTask(task, "test@test.com");

        // Assert
        await act.Should().ThrowAsync<KeyNotFoundException>();
        await _uow.DidNotReceive().CommitAsync();
    }

    [Fact]
    public async Task CalculateProgress_ShouldReturnCorrectPercentage()
    {
        // Arrange
        var sut = CreateSut();
        int projectId = 1;
        ICollection<Models.Task> tasks = [
            new() { Id = 1, Completed = true },
            new() { Id = 2, Completed = true },
            new() { Id = 3, Completed = false },
            new() { Id = 4, Completed = false }
        ];

        _taskRepo.GetAllTasks(projectId).Returns(tasks);

        // Act
        var result = await sut.CalculateProgress(projectId);

        // Assert
        result.Should().Be(50.0); 
    }

    [Fact]
    public async Task UpdateTaskState_ShouldToggleCompletedStatus()
    {
        // Arrange
        var sut = CreateSut();
        var task = new Models.Task { Id = 1, Completed = false };
        _taskRepo.GetTask(1).Returns(task);

        // Act
        await sut.UpdateTaskState(1);

        // Assert
        task.Completed.Should().BeTrue();
        await _uow.Received(1).CommitAsync();
    }
    [Fact]
    public async Task DeleteTask_ShouldCallDeleteAndCommit_WhenTaskExists()
    {
        // Arrange
        var sut = CreateSut();
        var task = new Models.Task { Id = 1 };
        _taskRepo.GetTask(1).Returns(task);

        // Act
        await sut.DeleteTask(1);

        // Assert
        await _taskRepo.Received(1).Delete(task);
        await _uow.Received(1).CommitAsync();
    }

    [Fact]
    public async Task DeleteTask_ShouldThrowArgumentException_WhenTaskDoesNotExist()
    {
        // Arrange
        var sut = CreateSut();
        _taskRepo.GetTask(1).Returns((Models.Task)null!);

        // Act
        var act = () => sut.DeleteTask(1);

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithMessage("this task doesn't exist");
        await _uow.DidNotReceive().CommitAsync();
    }

    // --- GetAllTasks Tests ---
    [Fact]
    public async Task GetAllTasks_ShouldReturnCollection_WhenTasksFound()
    {
        // Arrange
        var sut = CreateSut();
        ICollection<Models.Task> tasks = [new() { Id = 1 }, new() { Id = 2 }];
        _taskRepo.GetAllTasks(10).Returns(tasks);

        // Act
        var result = await sut.GetAllTasks(10);

        // Assert
        result.Should().HaveCount(2);
        await _uow.Received(1).CommitAsync();
    }

    [Fact]
    public async Task GetAllTasks_ShouldThrowKeyNotFound_WhenCollectionIsEmpty()
    {
        // Arrange
        var sut = CreateSut();
        _taskRepo.GetAllTasks(1).Returns([]); 

        // Act
        var act = () => sut.GetAllTasks(1);

        // Assert
        await act.Should().ThrowAsync<KeyNotFoundException>();
    }

    // --- CalculateProgress Edge Case ---

    [Fact]
    public async Task CalculateProgress_ShouldThrowArithmeticException_WhenNoTasksExist()
    {
        // Arrange
        var sut = CreateSut();
        _taskRepo.GetAllTasks(1).Returns([]);

        // Act
        var act = () => sut.CalculateProgress(1);

        // Assert
        await act.Should().ThrowAsync<ArithmeticException>()
            .WithMessage("There is no tasks to count Progress");
    }
}