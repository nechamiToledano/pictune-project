namespace PicTune.Core.Models
{
    public class MusicFile
    {
        public int Id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FileType { get; set; } = string.Empty; // MIME type
        public long Size { get; set; } // Adjusting to long for larger files
        public string S3Key { get; set; } = string.Empty; // The S3 Key
        public int FolderId { get; set; }
        public string OwnerId { get; set; } // The user who uploaded the file
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}
