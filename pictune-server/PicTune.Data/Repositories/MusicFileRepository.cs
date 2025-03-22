using Microsoft.EntityFrameworkCore;
using PicTune.Core.Models;
using PicTune.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PicTune.Data.Repositories
{
    public class MusicFileRepository : IMusicFileRepository
    {
        private readonly ApplicationDbContext _context;

        public MusicFileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MusicFile> GetByIdAsync(int id)
        {
            return await _context.MusicFiles.FindAsync(id);
        }

        public async Task<IEnumerable<MusicFile>> GetAllAsync()
        {
            return await _context.MusicFiles.ToListAsync();
        }

        public async Task AddAsync(MusicFile musicFile)
        {
            await _context.MusicFiles.AddAsync(musicFile);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(MusicFile musicFile)
        {
            _context.MusicFiles.Update(musicFile);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var musicFile = await _context.MusicFiles.FindAsync(id);
            if (musicFile != null)
            {
                _context.MusicFiles.Remove(musicFile);
                await _context.SaveChangesAsync();
            }
        }
    }

}
