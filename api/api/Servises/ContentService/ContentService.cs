using api.Extenstions;

namespace api.Servises.ContentService
{
    public class ContentService : IContentService
    {
        private readonly DataContext _context;
        private readonly IUploadFileService _uploadFileService;

        public ContentService(DataContext context , IUploadFileService uploadFileService)
        {
            _context = context;
            _uploadFileService = uploadFileService;
        }

        public async Task<Content> Create(Content content , List<string> imageNames)
        {
            content.Id = await GenerateContentId();
            if (imageNames?.Count > 0)
            {
                foreach (var imageName in imageNames)
                {
                    content.ContentImages.Add(new ContentImage
                    {
                        ImageUrl = imageName,
                        Content = content
                    });
                }
            }
            content.Created = DateTime.Now;
            await _context.AddAsync(content);
            await _context.SaveChangesAsync();
            return content;
        }

        public async Task<ICollection<ContentDto>> GetContentFriendByAccountId(int accountId)
        {
            var contentDtos = new List<ContentDto>();
            var trackings = await _context.Trackings.Where(t => t.AccountId.Equals(accountId)).ToListAsync();

            foreach (var tracking in trackings)
            {
                var contents = await _context.Contents
                  .AsNoTracking()
                   .Where(c => c.AccountId.Equals(tracking.FriendId))
                 .ContentToContentDto()
                 .ToListAsync();
                contentDtos.AddRange(contents);
            }

            return contentDtos;
        }

        public async Task DeleteImage(string fileName)
        {
            await _uploadFileService.DeleteImage(fileName);
        }
        public async Task<(string errorMessage, List<string> imageNames)> UploadImage(IFormFileCollection formFiles)
        {
            var errorMessage = string.Empty;
            var imageNames = new List<string>(); ;
            if (_uploadFileService.IsUpload(formFiles))
            {
                errorMessage = _uploadFileService.Validation(formFiles);
                if (string.IsNullOrEmpty(errorMessage))
                {
                    imageNames = (await _uploadFileService.UploadImages(formFiles));
                }
            }
            return (errorMessage, imageNames);
        }


        private async Task<string> GenerateContentId()
        {
            string randomId = "";
            while (true)
            {
                string now = DateTime.Now.ToString("yyyyMMddHHmmss");
                Random random = new Random();
                int randomNumber = random.Next(1, 1000000);
                randomId = $"{now}.{randomNumber}";
                if (await GetContentById(randomId, tracked: false) == null) break;
            }
            return randomId;
        }

        public async Task<ContentDto> GetContentById(string id, bool tracked = true)
        {
            IQueryable<Content> content = _context.Contents;
            if (!tracked) content.AsNoTracking();
            return await content.Include(c => c.ContentImages)
                .ContentToContentDto()
                .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}
