
namespace api.Servises.CommentService
{
    public interface ICommentService
    {
        Task<ICollection<CommentDto>> GetCommentByContentId (string contentId);
        Task<Comment> Create(Comment comment);
    }
}
