

namespace api.Extenstions
{
    public static class ContentExtenstions
    {
        public static IQueryable<ContentDto> ContentToContentDto(this IQueryable<Content> query)
        {
            return query
                .Select(content => new ContentDto
                {
                    Account = FromAccount(content.Account),
                    AccountId = content.AccountId,
                    ContentImages = content.ContentImages.Select(cm => new ContentImage
                    {
                        ContentId = cm.ContentId,
                        Id = cm.Id,
                        ImageUrl = !string.IsNullOrEmpty(cm.ImageUrl) ? $"{ApplicationUrl.UrlApp}/images/{cm.ImageUrl}" : "",
                    }).ToList(),
                    Created = content.Created,
                    Id = content.Id,
                    Message = content.Message
                }).AsNoTracking();
        }

        private static Account FromAccount(Account account)
        {
            return new Account
            {
                Id = account.Id,
                Email = account.Email,
                FirstName = account.FirstName,
                LastName = account.LastName,
                Password = account.Password,
                ProfileImageUrl = !string.IsNullOrEmpty(account.ProfileImageUrl) ? $"{ApplicationUrl.UrlApp}/images/{account.ProfileImageUrl}" : "",

            };
        }
    }
}
