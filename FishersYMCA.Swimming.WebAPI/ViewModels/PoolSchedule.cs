using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FishersYMCA.Swimming.Domain.Data;


namespace FishersYMCA.Swimming.WebAPI.ViewModels
{
    public class PoolSchedule
    {
        public PoolSchedule()
        {
            //this.LaneDetails = new List<LaneAssignment>();
        }

        public int LaneAssignID { get; set; }
        public string Time { get; set; }
        public string Day { get; set; }
       // public SlotDetail Test { get; set; }

        public SlotDetail Lane1 { get; set; }
        public SlotDetail Lane2 { get; set; }
        public SlotDetail Lane3 { get; set; }
        //public SlotDetail Lane4 { get; set; }
        //public SlotDetail Lane5 { get; set; }
        //public SlotDetail Lane6 { get; set; }
        //public SlotDetail Lane7 { get; set; }
        //public LaneAssignment LaneDetails { get; set; }


    }
}