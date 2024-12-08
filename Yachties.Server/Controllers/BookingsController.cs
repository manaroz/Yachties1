using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Yachties.Server.Data;
using Yachties.Server.Models;

namespace Yachties.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Booking>> CreateBooking(Booking booking)
        {
            if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
            {
                return Unauthorized("User identity not found.");
            }

            booking.UserId = User.Identity.Name;

            // Sprawdź, czy jacht jest dostępny w danym terminie
            var isYachtAvailable = await IsYachtAvailable(booking.YachtId, booking.StartDate, booking.EndDate);
            if (!isYachtAvailable)
            {
                return BadRequest("The yacht is not available for the selected dates.");
            }

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, booking);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.Bookings
                .Include(b => b.Yacht)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (booking == null)
            {
                return NotFound();
            }

            // Sprawdź, czy użytkownik ma prawo dostępu do tej rezerwacji
            if (booking.UserId != User.Identity?.Name)
            {
                return Forbid();
            }

            return booking;
        }

        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetUserBookings()
        {
            if (User.Identity == null || string.IsNullOrEmpty(User.Identity.Name))
            {
                return Unauthorized("User identity not found.");
            }

            return await _context.Bookings
                .Where(b => b.UserId == User.Identity.Name)
                .Include(b => b.Yacht)
                .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(int id, Booking booking)
        {
            if (id != booking.Id)
            {
                return BadRequest();
            }

            var existingBooking = await _context.Bookings.FindAsync(id);
            if (existingBooking == null)
            {
                return NotFound();
            }

            // Sprawdź, czy użytkownik ma prawo modyfikować tę rezerwację
            if (existingBooking.UserId != User.Identity?.Name)
            {
                return Forbid();
            }

            // Sprawdź, czy jacht jest dostępny w nowym terminie
            var isYachtAvailable = await IsYachtAvailable(booking.YachtId, booking.StartDate, booking.EndDate, id);
            if (!isYachtAvailable)
            {
                return BadRequest("The yacht is not available for the selected dates.");
            }

            existingBooking.YachtId = booking.YachtId;
            existingBooking.StartDate = booking.StartDate;
            existingBooking.EndDate = booking.EndDate;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            // Sprawdź, czy użytkownik ma prawo usunąć tę rezerwację
            if (booking.UserId != User.Identity?.Name)
            {
                return Forbid();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> IsYachtAvailable(int yachtId, DateTime startDate, DateTime endDate, int? excludeBookingId = null)
        {
            var overlappingBookings = await _context.Bookings
                .Where(b => b.YachtId == yachtId &&
                            b.Id != excludeBookingId &&
                            ((b.StartDate <= startDate && b.EndDate >= startDate) ||
                             (b.StartDate <= endDate && b.EndDate >= endDate) ||
                             (b.StartDate >= startDate && b.EndDate <= endDate)))
                .AnyAsync();

            return !overlappingBookings;
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.Id == id);
        }
    }
}
