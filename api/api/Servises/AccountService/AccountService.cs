
using api.Extenstions;
using Azure.Core;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Servises.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly IUploadFileService _uploadFileService;

        public AccountService(DataContext context, IConfiguration configuration, IUploadFileService uploadFileService)
        {
            _context = context;
            _configuration = configuration;
            _uploadFileService = uploadFileService;
        }

        public async Task<Account> Register(Account account)
        {
            account.Password = BCrypt.Net.BCrypt.HashPassword(account.Password);
            await _context.AddAsync(account);
            await _context.SaveChangesAsync();
            return account;
        }

        public string CreateToken(AccountDto account)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.NameIdentifier , account.Id.ToString()),
                new Claim(ClaimTypes.Email , account.Email)

            };

            //ทำการเข้ารหัส
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("ApiSettings:Token").Value!));

            // จะเข้ารหัสด้วยวิธีอะไร
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred
                );

            // WriteToken เขียนออกมา เป็น string 
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task DeleteImage(string fileName)
        {
            await _uploadFileService.DeleteImage(fileName);
        }

        public async Task<AccountDto> GetAccountById(int id, bool tracked = true)
        {
            IQueryable<Account> account = _context.Accounts;
            if (!tracked) account.AsNoTracking();
            return await account
                .Include(a => a.Contents)
                .ThenInclude(a => a.ContentImages)
                .AccountToAccountDto()
                .FirstOrDefaultAsync(a => a.Id.Equals(id));
        }

        public bool IsUniqueEmail(string email)
        {
            var account = _context.Accounts.FirstOrDefault(x => x.Email.Equals(email));
            if (account == null) return true;
            return false;
        }

        public async Task<(string errorMessage, string imageName)> UploadImage(IFormFileCollection formFiles)
        {
            var errorMessage = string.Empty;
            var imageName = string.Empty;
            if (_uploadFileService.IsUpload(formFiles))
            {
                errorMessage = _uploadFileService.Validation(formFiles);
                if (string.IsNullOrEmpty(errorMessage))
                {
                    imageName = (await _uploadFileService.UploadImages(formFiles))[0];
                }
            }
            return (errorMessage, imageName);
        }

        public async Task<AccountDto> Login(string email, string password)
        {
            var account = await _context.Accounts
                .Include(a => a.Contents)
                .ThenInclude(a => a.ContentImages)
                .AccountToAccountDto()
              .SingleOrDefaultAsync(p => p.Email == email);

            if (account == null) return null;
            //ถ้ามันเป็น false
            //parameter 1 => รหัสผ่านที่ login
            //parameter 2 => รหัสผ่านที่ผ่านการ Hash ใน Database

            if (!BCrypt.Net.BCrypt.Verify(password, account.Password))
                return null;

            account.Token = CreateToken(account);

            return account;
        }

        public async Task<ICollection<AccountDto>> SearchName(string name)
        {
            var accounts = await _context.Accounts
                .SearchName(name)
                .AccountToAccountDto()
                .ToListAsync();

            return accounts;
        }

        public async Task<ICollection<AccountDto>> GetAllFriend(int accountId)
        {
            var accounts = await _context.Accounts
                .Include(a => a.Contents)
                .ThenInclude(a => a.ContentImages)
                .AccountToAccountDto()
                .Where(a => a.Id != accountId)
                .ToListAsync();
            return accounts;
        }
    }
}
