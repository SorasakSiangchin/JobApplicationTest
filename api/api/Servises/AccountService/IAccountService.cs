

namespace api.Servises.AccountService
{
    public interface IAccountService
    {
        Task<AccountDto> GetAccountById(int id , bool tracked = true);
        Task<Account> Register (Account account);
        Task<AccountDto> Login(string email, string password);
        Task<(string errorMessage, string imageName)> UploadImage(IFormFileCollection formFiles);
        Task DeleteImage(string fileName);
        bool IsUniqueEmail(string email);
        Task<ICollection<AccountDto>> SearchName (string name);
        Task<ICollection<AccountDto>> GetAllFriend(int accountId);
    }
}
