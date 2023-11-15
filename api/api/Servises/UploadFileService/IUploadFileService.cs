namespace api.Servises.UploadFileService
{
    public interface IUploadFileService
    {
        bool IsUpload(IFormFileCollection formFiles);
        string Validation(IFormFileCollection formFiles);
        Task<List<string>> UploadImages(IFormFileCollection formFiles);
        Task DeleteImage(string filename);
    }
}
