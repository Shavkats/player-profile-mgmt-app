using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Player
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string fullName { get; set; }

        public byte age { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string citizenship { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string position { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string currentClub { get; set; }

        public decimal marketValue { get; set; }
    }
}
