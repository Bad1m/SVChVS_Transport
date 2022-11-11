using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Transport.Models;
using Transport.Request;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Transport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportController : ControllerBase
    {
        private readonly TransportAccountingContext context;

        public TransportController(TransportAccountingContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Models.Transport>> Get()
        {
            var Transport = await context.Transports.ToListAsync();

            return Transport;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateTransportRequest value)
        {
            var Transport = new Models.Transport
            {
                Number = value.Number,
                Capacity = value.Capacity,
                Weight = value.Weight,
                Speed = value.Speed,
                TechnicalСondition = value.TechnicalСondition,
            };

            await context.Transports.AddAsync(Transport);
            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var result = await context.Transports
                .FirstOrDefaultAsync(e => e.Id == id);
            if (result != null)
            {
                context.Transports.Remove(result);
                await context.SaveChangesAsync();
            }

            return Ok();
        }

        // PUT api/
        [HttpPut("{id}")]
        public async Task<ActionResult<Client>> Put([FromRoute] int id, Models.Transport transport)
        {
            if (transport == null)
            {
                return BadRequest();
            }
            if (!context.Clients.Any(x => x.Id == id))
            {
                return NotFound();
            }

            context.Update(transport);
            await context.SaveChangesAsync();
            return Ok(transport);
        }
    }
}
