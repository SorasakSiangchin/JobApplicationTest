using api.Extenstions;

namespace api.Servises.CommentService
{
    public class CommentService : ICommentService
    {
        private readonly DataContext _context;

        public CommentService(DataContext context)
        {
            _context = context;
        }

        public async Task<Comment> Create(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<ICollection<CommentDto>> GetCommentByContentId(string contentId)
        {
           return await _context.Comments
                .CommentToCommentDto(_context)
                .Where(c => c.ContentId.Equals(contentId))
                .ToListAsync();
        }
    }
}
