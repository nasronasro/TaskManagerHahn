using Microsoft.EntityFrameworkCore;
using ProjectTasksManager.Data;
using ProjectTasksManager.Models;
using ProjectTasksManager.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace ProjectTasksManager.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task<User?> GetAsyncUser(string email) {
            return await _context.Users
                .AsNoTracking()
                .Where(u => u.Email == email)
                .FirstOrDefaultAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .AsNoTracking()
                .Where(u => u.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> IsEmailUniqueAsync(string email)
        {

            bool emailExists = await _context.Users
                .AsNoTracking()
                .AnyAsync(u => u.Email == email);

            return !emailExists; 
        }
    }
}
