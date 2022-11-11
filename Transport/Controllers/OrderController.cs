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
    public class OrderController : ControllerBase
    {
        private readonly TransportAccountingContext context;

        public OrderController(TransportAccountingContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Order>> Get()
        {
            var orders = await context.Orders.ToListAsync();

            return orders;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateOrderRequest value)
        {
            var order = new Order
            {
                OrderPrice = value.OrderPrice,
                OrderData = value.OrderData,
                Client = value.Client,
                Transport = value.Transport,
            };

            await context.Orders.AddAsync(order);
            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var result = await context.Orders
                .FirstOrDefaultAsync(e => e.Id == id);
            if (result != null)
            {
                context.Orders.Remove(result);
                await context.SaveChangesAsync();
            }

            return Ok();
        }

        // PUT api/
        [HttpPut("{id}")]
        public async Task<ActionResult<Client>> Put([FromRoute] int id, Order order)
        {
            if (order == null)
            {
                return BadRequest();
            }
            if (!context.Clients.Any(x => x.Id == id))
            {
                return NotFound();
            }

            context.Update(order);
            await context.SaveChangesAsync();
            return Ok(order);
        }
    }
}
