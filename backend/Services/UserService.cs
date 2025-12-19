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
        ////dependencies inversion respecting the D in Solid
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;

        public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
        }

        //adding User for testing puposes
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

        // Authentification using JWT TokenService 
        public async Task<string> Authenticate(string email, string password)
        {
            var user = await _userRepository.GetAsyncUser(email);
            if (user == null)
                throw new ArgumentException("Invalid credentials.");

            if (!VerifyPassword(password, user.Password))
                throw new ArgumentException("Invalid credentials.");

            await _unitOfWork.CommitAsync();
            return _tokenService.GenerateToken(user);
        }

        
        public async Task<User?> GetUserById(int id)
        {
            if (await _userRepository.GetByIdAsync(id) == null)
                throw new ArgumentException("There is no user with this Id");

            await _unitOfWork.CommitAsync();
            return await _userRepository.GetByIdAsync(id);
        }

        //Help methodes for hashing and verifying password
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
