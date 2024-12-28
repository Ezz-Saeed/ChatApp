using ChatApp.Helpers;
using ChatApp.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace ChatApp.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary cloudinary;
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            Account account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
            cloudinary = new Cloudinary(account);
        }
 

        public async Task<ImageUploadResult> AddImageAsync(IFormFile photo)
        {
            var uploadResult = new ImageUploadResult();
            if(photo.Length > 0)
            {
                using var stream = photo.OpenReadStream();
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(photo.FileName, stream),
                    Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                };
                uploadResult = await cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await cloudinary.DestroyAsync(deleteParams);
            return result;
        }
    }
}
