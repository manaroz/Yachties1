using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Yachties.Server.Data;
using Yachties.Server.Models;

namespace Yachties.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class YachtsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public YachtsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Yacht>>> GetYachts()
        {
            return await _context.Yachts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Yacht>> GetYacht(int id)
        {
            var yacht = await _context.Yachts.FindAsync(id);

            if (yacht == null)
            {
                return NotFound();
            }

            return yacht;
        }

        [HttpPost]
        public async Task<ActionResult<Yacht>> CreateYacht(Yacht yacht)
        {
            _context.Yachts.Add(yacht);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetYacht), new { id = yacht.Id }, yacht);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateYacht(int id, Yacht yacht)
        {
            if (id != yacht.Id)
            {
                return BadRequest();
            }

            _context.Entry(yacht).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!YachtExists(id))
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
        public async Task<IActionResult> DeleteYacht(int id)
        {
            var yacht = await _context.Yachts.FindAsync(id);
            if (yacht == null)
            {
                return NotFound();
            }

            _context.Yachts.Remove(yacht);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool YachtExists(int id)
        {
            return _context.Yachts.Any(e => e.Id == id);
        }
    }
}
