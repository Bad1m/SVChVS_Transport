using System;
using System.Collections.Generic;

#nullable disable

namespace Transport.Models
{
    public partial class Transport
    {
        public Transport()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public int Number { get; set; }
        public string Type { get; set; }
        public int Capacity { get; set; }
        public int Weight { get; set; }
        public int Speed { get; set; }
        public string TechnicalСondition { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
