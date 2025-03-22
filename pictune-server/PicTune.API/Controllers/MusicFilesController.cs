using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PicTune.Core.DTOs;
using PicTune.Core.IServices;
using System.Security.Claims;

namespace PicTune.API.Controllers
{

    [Route("api/files")]
    [ApiController]
    public class MusicFileController : ControllerBase
    {
        private readonly IMusicFileService _musicFileService;
        private readonly IAmazonS3 _s3Client;

        public MusicFileController(IMusicFileService musicFileService, IAmazonS3 s3Client)
        {
            _musicFileService = musicFileService;
            _s3Client = s3Client;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllMusicFiles()
        {
            var files = await _musicFileService.GetAllMusicFilesAsync();
            return Ok(files);
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetMusicFileById(int id)
        {
            var file = await _musicFileService.GetMusicFileByIdAsync(id);
            return Ok(file);
        }



        [HttpPut("{id}")]
        [Authorize("EditorOrAdmin")]
        public async Task<IActionResult> UpdateMusicFile(int id, [FromBody] MusicFileUploadDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var success = await _musicFileService.UpdateMusicFileAsync(id, dto.FileName, userId);
            return success ? Ok("File updated") : Forbid();
        }

        [HttpDelete("{id}")]
        [Authorize("EditorOrAdmin")]
        public async Task<IActionResult> DeleteMusicFile(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var success = await _musicFileService.DeleteMusicFileAsync(id, userId);
            return success ? Ok("File deleted") : Forbid();
        }
        [HttpGet("{id}/play")]
        [Authorize]
        public async Task<IActionResult> GetMusicFileUrl(int id)
        {
            var file = await _musicFileService.GetMusicFileByIdAsync(id);
            if (file == null) return NotFound("File not found.");

            // Generate a pre-signed URL
            var request = new GetPreSignedUrlRequest
            {
                BucketName ="pictune-files-testpnoren",
                Key = file.S3Key, // Assuming your DTO contains the S3 key
                Expires = DateTime.UtcNow.AddHours(1), // URL valid for 1 hour
                Verb = HttpVerb.GET
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }
    }
}
