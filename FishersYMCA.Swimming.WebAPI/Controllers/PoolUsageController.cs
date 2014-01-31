using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using FishersYMCA.Swimming.WebAPI.Models;
using FishersYMCA.Swimming.WebAPI.Models.Data;
using FishersYMCA.Swimming.WebAPI.ViewModels;

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
        public IQueryable<JoeModel> GetLaneScheduleByDay(string day)
        {

            return _poolRepository.Query().
                Where(x=>x.Day == day)
                .Select(x => new JoeModel{
                    Name= x.Day
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
