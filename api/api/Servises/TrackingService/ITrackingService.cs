namespace api.Servises.TrackingService
{
    public interface ITrackingService
    {
        Task<Tracking> GetSinglyTracking(int accountId, int friendId);
        Task<ICollection<Tracking>> GetAllTracking();
        Task<Tracking> Follow(Tracking tracking);
        Task<Tracking> UnFollow(Tracking tracking);
    }
}
