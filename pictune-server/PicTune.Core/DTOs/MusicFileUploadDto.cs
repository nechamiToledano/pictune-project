namespace PicTune.Core.DTOs
{
    public class MusicFileUploadDto
    {
        public string FileName { get; set; } = string.Empty;  // שם הקובץ
        public string FileType { get; set; } = string.Empty;  // סוג הקובץ (למשל "audio/mpeg" עבור mp3)
        public int Size { get; set; }  // גודל הקובץ
        public string S3Key { get; set; } = string.Empty;  // מפתח S3 (אם כבר קיים לאחר העלאת הקובץ)
        public int FolderId { get; set; }  // מזהה התיקיה שבה נמצא הקובץ
    }
}
