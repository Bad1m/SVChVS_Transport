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
    public class ClientController : ControllerBase
    {
        private readonly TransportAccountingContext context;

        public ClientController(TransportAccountingContext context)
        {
            this.context = context;
        }

        // GET: api/<ClientController>
        [HttpGet]
        public async Task<IEnumerable<Client>> Get()
        {
            var clients = await context.Clients.ToListAsync();

            return clients;
        }

        [HttpGet("{id}")]
        public async Task<Client> GetById([FromRoute] int id)
        {
            var client = await context.Clients.FirstOrDefaultAsync(_ => _.Id == id);

            return client;
        }

        // POST api/<ClientController>
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateClientRequest value)
        {
            var client = new Client
            {
                LastName = value.LastName,
                FirstName = value.FirstName,
                Patronymic = value.Patronymic,
                Number = value.Number,
                Price = value.Price,
            };

            await context.Clients.AddAsync(client);
            await context.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/<ClientController>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var result = await context.Clients
               .FirstOrDefaultAsync(e => e.Id == id);
            if (result != null)
            {
                context.Clients.Remove(result);
                await context.SaveChangesAsync();
            }

            return Ok();
        }

        // PUT api/
        [HttpPut("{id}")]
        public async Task<ActionResult<Client>> Put([FromRoute] int id, Client client)
        {
            if (client == null)
            {
                return BadRequest();
            }
            if (!context.Clients.Any(x => x.Id == id))
            {
                return NotFound();
            }

            context.Update(client);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
