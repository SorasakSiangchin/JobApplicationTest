using api.Extenstions;
using Microsoft.Identity.Client;
using System.Diagnostics;

namespace api.Servises.TrackingService
{
    public class TrackingService : ITrackingService
    {
        private readonly DataContext _context;

        public TrackingService(DataContext context)
        {
            _context = context;
        }

        public async Task<Tracking> Follow(Tracking tracking)
        {
            await _context.AddAsync(tracking);
            await _context.SaveChangesAsync();
            return tracking;
        }

        public async Task<ICollection<Tracking>> GetAllTracking () => await _context.Trackings.ToListAsync();
           
        public Task<Tracking> GetSinglyTracking(int accountId, int friendId)
        {
           var tracking = _context.Trackings
                .FirstOrDefaultAsync(t => t.AccountId.Equals(accountId) && t.FriendId.Equals(friendId));
            
            return tracking;
        }

        public async Task<Tracking> UnFollow(Tracking tracking)
        {
            var result = await _context.Trackings
                .FirstOrDefaultAsync(t => t.FriendId.Equals(tracking.FriendId) && t.AccountId.Equals(tracking.AccountId));
            if (result is null) return null;

            _context.Remove(result);
            await _context.SaveChangesAsync();

            return tracking;
        }
    }
}
