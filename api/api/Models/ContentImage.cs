using System.Text.Json.Serialization;

namespace api.Models
{
    public class ContentImage
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string ContentId { get; set; }
        [JsonIgnore]
        public Content Content { get; set; }
    }
}
