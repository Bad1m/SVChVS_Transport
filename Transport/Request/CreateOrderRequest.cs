using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Transport.Request
{
    public class CreateOrderRequest
    {
        public decimal OrderPrice { get; set; }
        public DateTime OrderData { get; set; }
        public DateTime OrderTime { get; set; }
        public int Client { get; set; }
        public int Transport { get; set; }
    }
}
