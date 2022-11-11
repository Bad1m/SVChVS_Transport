using System;
using System.Collections.Generic;

#nullable disable

namespace Transport.Models
{
    public partial class Order
    {
        public int Id { get; set; }
        public decimal OrderPrice { get; set; }
        public DateTime OrderData { get; set; }
        public int Client { get; set; }
        public int Transport { get; set; }

        public virtual Client ClientNavigation { get; set; }
        public virtual Transport TransportNavigation { get; set; }
    }
}
