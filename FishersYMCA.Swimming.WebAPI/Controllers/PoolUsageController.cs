using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity.SqlServer;
using FishersYMCA.Swimming.WebAPI.Models;
using FishersYMCA.Swimming.Domain.Data;
using FishersYMCA.Swimming.WebAPI.ViewModels;
using Newtonsoft.Json;

namespace FishersYMCA.Swimming.WebAPI.Controllers
{
   //[HttpHeader("Access-Control-Allow-Origin", "http://localhost:51234")]  

    public class PoolUsageController : ApiController
    {
       private readonly IRepository<PoolUsage> _poolRepository;
 
        private readonly IUnitOfWork _unitOfWork;
        public PoolUsageController(IRepository<PoolUsage> poolRepository, IUnitOfWork unitOfWork)
        {
            if (poolRepository == null)
            {
                throw new ArgumentNullException("PoolRepository is null");
            }
            _poolRepository = poolRepository;

            _unitOfWork = unitOfWork;
          
        }

        [Route("Lanes/Schedule/Id/{id}")]
        public PoolUsage GetLaneScheduleById(long Id)
        {
           // LaneAssignController _lane = new LaneAssignController(
            return _poolRepository.GetById(Id);
        }

        [Route("Lanes/Schedule")]
        public IQueryable<PoolUsage> GetLaneSchedule()
        {
            
            return _poolRepository.Query();
        }

        [Route("Lanes/Schedule/Day/{day}")]
        public IQueryable<PoolSchedule> GetLaneScheduleByDay(string day)
        {
            
            //var daySlots = _poolRepository.Query().
            //    Where(x => x.Day == day);

            //var lanes = daySlots.Select(l => l.LaneAssignments.Where(s => s.SlotID == l.ID));

            //var result = lanes.First();

            
            //var lanes = _poolRepository.Query().
            //  Where(x => x.Day == day).Select(x => new PoolSchedule
            //  {
            //      Time = x.Time,
            //      Day = x.Day,
            //      LaneDetails = x.LaneAssignments.Select(ln => ln.SlotID == x.ID)
            //      //Lane = 
            //  });
            //var query =  _poolRepository.Query().
            //    Where(x => x.Day == day)
            //    .Select(x => new PoolSchedule
            //    {
            //        Day = x.Day,
            //        Time = x.Time,
            //        Lane1 = x.LaneAssignments.Where(s => s.SlotID == x.ID).FirstOrDefault(). Description
            //    });
          

    
            return _poolRepository.Query().
                Where(x => x.Day == day)
                .Select(x => new PoolSchedule
                {
                    
                    Day = x.Day,
                    Time = x.Time,
                    //LaneAssignID = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 1").FirstOrDefault().ID,
                    Lane1 = new SlotDetail
                    {
                        ID = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 1").FirstOrDefault().ID,
                        Description = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 1").FirstOrDefault().Description
                    },

                    Lane2 = new SlotDetail
                    {
                        ID = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 2").FirstOrDefault().ID,
                        Description = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 2").FirstOrDefault().Description
                    },

                    Lane3 = new SlotDetail
                    {
                        ID = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 3").FirstOrDefault().ID,
                        Description = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 3").FirstOrDefault().Description
                    }
                    ////Lane4 = new SlotDetail
                    ////{
                    ////    ID = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 4").FirstOrDefault().ID,
                    ////    Description = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 4").FirstOrDefault().Description
                    ////},
                    ////Lane5 = new SlotDetail
                    ////{
                    ////    ID = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 5").FirstOrDefault().ID,
                    ////    Description = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 5").FirstOrDefault().Description
                    ////},
                    ////Lane6 = new SlotDetail
                    ////{
                    ////    ID = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 6").FirstOrDefault().ID,
                    ////    Description = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 6").FirstOrDefault().Description
                    ////},
                    ////Lane7 = new SlotDetail
                    ////{
                    ////    ID = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 7").FirstOrDefault().ID,
                    ////    Description = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 7").FirstOrDefault().Description
                    ////}
                    //LaneDetails = x.LaneAssignments.Where(s => s.SlotID == x.ID).Where(l => l.Lane == "Lane 7").FirstOrDefault().LaneAssignmentDetails.Where(a => a.ID == lanes
                });
        }

        [Route("Schedule/Add"),HttpPost]
        public void GetLaneSchedule(PoolUsage pool)
        {
            _poolRepository.Create(pool);
            _unitOfWork.Commit();


           // return _poolRepository.Query();
        }
    }
}
