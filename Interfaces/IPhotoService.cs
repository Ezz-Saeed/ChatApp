using CloudinaryDotNet.Actions;

namespace ChatApp.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddImageAsync(IFormFile photo);
        Task<DeletionResult> DeleteImageAsync(string publicId);
    }
}
