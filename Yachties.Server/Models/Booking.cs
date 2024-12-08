using System.ComponentModel.DataAnnotations;

namespace Yachties.Server.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int YachtId { get; set; }
        public Yacht? Yacht { get; set; }
        [Required]
        public string UserId { get; set; } = string.Empty;
        public ApplicationUser? User { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}