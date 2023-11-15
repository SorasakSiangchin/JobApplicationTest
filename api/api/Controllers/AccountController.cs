

using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("[action]/{accountId}")]
        public async Task<ActionResult<ServiceResponse<ICollection<AccountDto>>>> GetAllFriend(int accountId)
        {
            var serviceResponse = new ServiceResponse<ICollection<AccountDto>>();
            serviceResponse.Data = await _accountService.GetAllFriend(accountId);
            return Ok(serviceResponse);
        }

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<ServiceResponse<AccountDto>>> GetAccountById(int id)
        {
            var serviceResponse = new ServiceResponse<AccountDto>();
            serviceResponse.Data = await _accountService.GetAccountById(id);
            return Ok(serviceResponse);
        }

        [HttpGet("[action]/{name}")]
        public async Task<ActionResult<ServiceResponse<ICollection<AccountDto>>>> GetAccountByName(string name)
        {
            var serviceResponse = new ServiceResponse<ICollection<AccountDto>> ();
            serviceResponse.Data = await _accountService.SearchName(name);
            return Ok(serviceResponse);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ServiceResponse<AccountDto>>> Login([FromForm] LoginDto login)
        {
            var serviceResponse = new ServiceResponse<AccountDto>();
            var account = await _accountService.Login(login.Email, login.Password);
            if (account == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Incorrect email or password";
                return Ok(serviceResponse);
            }
            serviceResponse.Data = account;
            return Ok(serviceResponse);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ServiceResponse<Account>>> Register([FromForm] RegisterDto register)
        {
            var serviceResponse = new ServiceResponse<Account>();
            
            (string errorMessage, string imageName) =  await _accountService.UploadImage(register.FormFiles);
            if (!string.IsNullOrEmpty(errorMessage))
            {
                serviceResponse.Message = errorMessage;
                serviceResponse.Success = false;
                return Ok(serviceResponse);
            }

            bool ifEmailisUnique = _accountService.IsUniqueEmail(register.Email);
            if (!ifEmailisUnique)
            {
                serviceResponse.Message = errorMessage;
                serviceResponse.Success = false;
                return Ok(serviceResponse);
            }

            var account = register.Adapt<Account>();
            account.ProfileImageUrl = imageName;

            var result = await _accountService.Register(account);
            serviceResponse.Data = result;

            return Ok(serviceResponse);
        }

    }
}
