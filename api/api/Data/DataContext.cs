

namespace api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=DESKTOP-6TJ4MKL;Database=job-application-socialmedia;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tracking>()
           .HasKey(t => new { t.FriendId , t.AccountId });

        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Content> Contents { get; set; }
        public DbSet<ContentImage> ContentImages { get; set; }
        public DbSet<Tracking> Trackings { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
