namespace api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int AccountId { get; set; }
        public string ContentId { get; set; }
        public Content Content { get; set; }

    }
}
