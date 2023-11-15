using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("[action]/{contentId}")]
        public async Task<ActionResult<ServiceResponse<ICollection<CommentDto>>>> GetCommentByContentId(string contentId)
        {
            var serviceResponse = new ServiceResponse<ICollection<CommentDto>>();
            serviceResponse.Data = await _commentService.GetCommentByContentId(contentId);
            return Ok(serviceResponse);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<Comment>>> CreateComment([FromForm] CreateCommentDto commentDto)
        {
            var serviceResponse = new ServiceResponse<Comment>();
            var commnet = commentDto.Adapt<Comment>();
            await _commentService.Create(commnet);
            serviceResponse.Data = commnet;
            return Ok(serviceResponse);
        }
    }
}
