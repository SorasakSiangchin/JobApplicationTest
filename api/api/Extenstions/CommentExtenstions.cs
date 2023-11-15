namespace api.Extenstions
{
    public static class CommentExtenstions
    {
        public static IQueryable<CommentDto> CommentToCommentDto(this IQueryable<Comment> query , DataContext context)
        {
            return query
                .Select(comment => new CommentDto
                {
                    Id= comment.Id,
                    AccountId= comment.AccountId,   
                    Message= comment.Message,
                    ContentId= comment.ContentId,
                    Account = context.Accounts.AccountToAccountDto().FirstOrDefault(a => a.Id.Equals(comment.AccountId))
                }).AsNoTracking();
        }
    }
}
