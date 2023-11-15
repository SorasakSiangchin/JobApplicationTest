namespace api.Dtos.Account
{
    public class AccountDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ProfileImageUrl { get; set; }
        public string Token { get; set; } = string.Empty;
        public List<Models.Content> Contents { get; set; } = new List<Models.Content>();
    }
}
