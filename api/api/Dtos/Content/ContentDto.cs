namespace api.Dtos.Content
{
    public class ContentDto
    {
        public string Id { get; set; }
        public DateTime? Created { get; set; }
        public string Message { get; set; } = string.Empty;
        public int AccountId { get; set; }
        public Models.Account Account { get; set; }
        public List<ContentImage> ContentImages { get; set; } = new ();
    }
}
