
namespace api.Dtos.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int AccountId { get; set; }
        public string ContentId { get; set; }
        public AccountDto Account { get; set; }

    }
}
