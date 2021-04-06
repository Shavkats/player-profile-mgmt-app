using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class PlayerDBContext : DbContext
    {
        public PlayerDBContext(DbContextOptions<PlayerDBContext> options) : base(options)
        {

        }

        public DbSet<Player> Players { get; set; }
    }
}
