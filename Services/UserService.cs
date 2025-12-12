using ProjectTasksManager.Data;
using ProjectTasksManager.Models;
using ProjectTasksManager.Repositories;
using Task = System.Threading.Tasks.Task;


namespace ProjectTasksManager.Services
{
    public class UserService : IUserService
    {
        IUserRepository userRepository;
        IUnitOfWork unitOfWork;
        public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            this.userRepository = userRepository;
            this.unitOfWork = unitOfWork;
        }
        public async Task AddUser(User user)
        {
            if(await userRepository.IsEmailUniqueAsync(user.Email))
            {
                await userRepository.AddAsync(user);
                await unitOfWork.CommitAsync();
            }
            else throw new ArgumentException($"User with email '{user.Email}' already exists.");
        }
        public async Task<User?> GetUser(User user)
        {
            User? currUser = await userRepository.GetAsyncUser(user.Email);
            if (currUser == null)
                throw new ArgumentException("Invalid credentials.");

            if (currUser.Password == user.Password)
                return currUser;

            throw new ArgumentException("Invalid credentials.");
        }
    }
}
