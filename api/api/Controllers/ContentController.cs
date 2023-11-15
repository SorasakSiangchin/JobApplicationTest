using api.Models;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly IContentService _contentService;

        public ContentController(IContentService contentService)
        {
            _contentService = contentService;
        }

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<ServiceResponse<ICollection<ContentDto>>>> GetContentByFriendAccountId(int id)
        {
            var serviceResponse = new ServiceResponse<ICollection<ContentDto>>();
            serviceResponse.Data = await _contentService.GetContentFriendByAccountId(id);
            return Ok(serviceResponse);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<Content>>> CreateContent([FromForm] CreateContentDto contentDto)
        {
            var serviceResponse = new ServiceResponse<Content>();
            (string errorMessage, List<string> imageNames) = await _contentService.UploadImage(contentDto.FormFiles);
            if (!string.IsNullOrEmpty(errorMessage))
            {
                serviceResponse.Message = errorMessage;
                serviceResponse.Success = false;
                return Ok(serviceResponse);
            }

            var content = contentDto.Adapt<Content>();

            serviceResponse.Data = await _contentService.Create(content , imageNames);

            return Ok(serviceResponse);
        }


    }
}
