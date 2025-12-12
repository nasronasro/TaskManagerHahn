using System.Security.Cryptography;
using System.Text;
using ProjectTasksManager.Data;
using ProjectTasksManager.Models;
using ProjectTasksManager.Repositories.Interfaces;
using ProjectTasksManager.Services.Interfaces;
using Task = System.Threading.Tasks.Task;


namespace ProjectTasksManager.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;

        public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
        }
        public async Task<User> AddUser(User user)
        {
            if (await _userRepository.IsEmailUniqueAsync(user.Email))
            {
                // Hash password before saving
                user.Password = HashPassword(user.Password);
                await _userRepository.AddAsync(user);
                await _unitOfWork.CommitAsync();
                return user;
            }
            throw new ArgumentException($"User with email '{user.Email}' already exists.");
        }

        public async Task<string> Authenticate(string email, string password)
        {
            var user = await _userRepository.GetAsyncUser(email);
            if (user == null)
                throw new ArgumentException("Invalid credentials.");

            if (!VerifyPassword(password, user.Password))
                throw new ArgumentException("Invalid credentials.");

            return _tokenService.GenerateToken(user);
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        private bool VerifyPassword(string inputPassword, string storedHash)
        {
            var hashOfInput = HashPassword(inputPassword);
            return hashOfInput == storedHash;
        }
    }
}
