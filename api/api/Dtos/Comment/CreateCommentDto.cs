namespace api.Dtos.Comment
{
    public class CreateCommentDto
    {
        public string Message { get; set; }
        public int AccountId { get; set; }
        public string ContentId { get; set; }
    }
}
