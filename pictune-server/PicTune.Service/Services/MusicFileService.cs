using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PicTune.Core.IServices;
using PicTune.Core.Models;
using PicTune.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PicTune.Service
{
    public class MusicFileService : IMusicFileService
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;

        public MusicFileService(UserManager<User> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // Get all music files (with an option to apply filters in the future)
        public async Task<IEnumerable<MusicFile>> GetAllMusicFilesAsync()
        {
            return await _context.MusicFiles.Where(f => !f.IsDeleted).ToListAsync(); // Exclude deleted files
        }

        // Get a specific music file by ID
        public async Task<MusicFile?> GetMusicFileByIdAsync(int id)
        {
            return await _context.MusicFiles.FindAsync(id); // Use FindAsync to retrieve by ID directly
        }

        // Add a new music file and assign "Editor" role to the uploader
        public async Task<MusicFile?> AddMusicFileAsync(MusicFile musicFile, string userName)
      
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null) return null;

            // Assign the user the "Editor" role if they don't have it
            if (!(await _userManager.IsInRoleAsync(user, "Editor")))
            {
                await _userManager.AddToRoleAsync(user, "Editor");
            }

            // Save the new music file to the database
            musicFile.OwnerId = user.Id; // Associate the file with the user's ID
            _context.MusicFiles.Add(musicFile);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return musicFile; // Successfully added the music file
            }

            return null; // Failed to add the music file
        }

        // Delete a music file if the user is an Admin or Editor
        public async Task<bool> DeleteMusicFileAsync(int id, string userId)
        {
            var file = await _context.MusicFiles.FindAsync(id);
            if (file == null) return false;

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null || !(await _userManager.IsInRoleAsync(user, "Editor") || await _userManager.IsInRoleAsync(user, "Admin")))
                return false;

            // Mark the file as deleted (soft delete)
            file.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        // Update a music file's details if the user is an Admin or Editor
        public async Task<bool> UpdateMusicFileAsync(int id, string newFileName, string userId)
        {
            var file = await _context.MusicFiles.FindAsync(id);
            if (file == null) return false;

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null || !(await _userManager.IsInRoleAsync(user, "Editor") || await _userManager.IsInRoleAsync(user, "Admin")))
                return false;

            // Update file metadata
            file.FileName = newFileName;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
