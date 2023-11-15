namespace api.Servises.ContentService
{
    public interface IContentService
    {
        Task<ICollection<ContentDto>> GetContentFriendByAccountId(int accountId);
        Task<ContentDto> GetContentById(string id, bool tracked = true);
        Task<Content> Create(Content content , List<string> imageNames);
        Task<(string errorMessage, List<string> imageNames)> UploadImage(IFormFileCollection formFiles);
        Task DeleteImage(string fileName);

    }
}
