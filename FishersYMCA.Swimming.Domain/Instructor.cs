using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FishersYMCA.Swimming.Domain;


namespace FishersYMCA.Swimming.Domain
{
  
    public partial class Instructor : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public int ID { get; set; }
    }
}
