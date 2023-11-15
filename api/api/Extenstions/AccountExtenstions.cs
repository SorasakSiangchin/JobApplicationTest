using api.Models;
using Microsoft.IdentityModel.Tokens;

namespace api.Extenstions
{
    public static class AccountExtenstions
    {
        public static IQueryable<AccountDto> AccountToAccountDto(this IQueryable<Account> query)
        {
            return query
                .Select(account => new AccountDto
                {
                    Id= account.Id,
                    Contents= account.Contents.Select(c => FromContent(c)).ToList(),
                    Email= account.Email,
                    FirstName= account.FirstName,
                    LastName= account.LastName,
                    Password= account.Password,
                    ProfileImageUrl = !string.IsNullOrEmpty(account.ProfileImageUrl) ? $"{ApplicationUrl.UrlApp}/images/{account.ProfileImageUrl}" : "",
                }).AsNoTracking();
        }

        public static IQueryable<Account> SearchName(this IQueryable<Account> query, string searchName)
        {
            if (string.IsNullOrEmpty(searchName)) return query;
            var lowerCaseSearchName = searchName.Trim().ToLower();
            return query.Where(p => p.FirstName.ToLower().Contains(lowerCaseSearchName) || p.LastName.ToLower().Contains(lowerCaseSearchName));
        }

        private static Content FromContent (Content content)
        {
            return new Content
            {
               Id = content.Id ,
               Created = content.Created ,
               Message = content.Message ,
               ContentImages = content.ContentImages.Select(cm => new ContentImage
               {
                   ContentId = cm.ContentId ,
                   Id = cm.Id ,
                   ImageUrl = !string.IsNullOrEmpty(cm.ImageUrl) ? $"{ApplicationUrl.UrlApp}/images/{cm.ImageUrl}" : "",
               }).ToList()
            };
        }
    }
}
