using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Content
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        public DateTime? Created { get; set; }
        public string Message { get; set; } = string.Empty;
        public int AccountId { get; set; }
        public Account Account { get; set; }
        public List<ContentImage> ContentImages { get; set; } = new();
        public List<Comment> Comments { get; set; }
    }
}
