namespace api.Models
{
    public class Tracking
    {
        public int FriendId { get; set; }
        public int AccountId { get; set; }
        public Account Account { get; set; }
    }
}
