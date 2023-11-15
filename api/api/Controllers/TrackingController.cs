using api.Dtos.Tracking;
using api.Models;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackingController : ControllerBase
    {
        private readonly ITrackingService _trackingService;

        public TrackingController(ITrackingService trackingService)
        {
            _trackingService = trackingService;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ServiceResponse<Tracking>>> Follow([FromForm] TrackingDto trackingDto)
        {
            var serviceResponse = new ServiceResponse<Tracking>();
            var tracking = trackingDto.Adapt<Tracking>();
            serviceResponse.Data = await _trackingService.Follow(tracking);
            return Ok(serviceResponse);

        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ServiceResponse<Tracking>>> UnFollow([FromForm] TrackingDto trackingDto)
        {
            var serviceResponse = new ServiceResponse<Tracking>();
            var trackingResponse =  await _trackingService.UnFollow(trackingDto.Adapt<Tracking>()) ;

            if (trackingResponse == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"Tracking with FriendId or AccountId not found.";
                return Ok(serviceResponse);
            }
            
            serviceResponse.Data = trackingResponse;
            return Ok(serviceResponse);

        }

        [HttpGet("[action]/{accountId}/{friendId}")]
        public async Task<ActionResult<ServiceResponse<Tracking>>> GetSinglyTracking(int accountId, int friendId)
        {
            var serviceResponse = new ServiceResponse<Tracking>();
            var tracking = await _trackingService.GetSinglyTracking(accountId, friendId);
            if (tracking == null)
            {
                serviceResponse.Success = false;
                return Ok(serviceResponse);
            }
            serviceResponse.Data = tracking;
            return Ok(serviceResponse);
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<ICollection<Tracking>>>> GetAllTracking()
        {
            var serviceResponse = new ServiceResponse<ICollection<Tracking>> ();
            var trackings = await _trackingService.GetAllTracking();
            serviceResponse.Data = trackings;
            return Ok(serviceResponse);
        }

    }
}
