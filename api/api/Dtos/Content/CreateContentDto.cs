namespace api.Dtos.Content
{
    public class CreateContentDto
    {
        public string? Message { get; set; } = string.Empty;
        public int AccountId { get; set; }
        public IFormFileCollection? FormFiles { get; set; }
    }
}
