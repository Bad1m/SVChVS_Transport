using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Transport.Request
{
    public class CreateClientRequest
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Patronymic { get; set; }
        public int Number { get; set; }
        public decimal Price { get; set; }
    }
}
