using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FishersYMCA.Swimming.Domain;

namespace FishersYMCA.Swimming.Domain
{


        public partial class LaneAssignmentDetail : Entity
        {
            public int ID { get; set; }
            public string AssignmentType { get; set; }
            public string InstructorName { get; set; }
            public string StudentName { get; set; }
        }
    
}
