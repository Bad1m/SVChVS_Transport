using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Transport.Request
{
    public class CreateTransportRequest
    {
        public int Number { get; set; }
        public string Type { get; set; }
        public int Capacity { get; set; }
        public int Weight { get; set; }
        public int Speed { get; set; }
        public string TechnicalСondition { get; set; }
    }
}
