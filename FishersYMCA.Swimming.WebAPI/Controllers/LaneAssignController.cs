using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FishersYMCA.Swimming.WebAPI.Models;
using FishersYMCA.Swimming.Domain;


namespace FishersYMCA.Swimming.WebAPI.Controllers
{
    public class LaneAssignController : ApiController
    {
        private readonly IRepository<LaneAssignmentDetail> _laneAssignRepository;
 
        private readonly IUnitOfWork _unitOfWork;
        public LaneAssignController(IRepository<LaneAssignmentDetail> laneRepository)
        {
            if (laneRepository == null)
            {
                throw new ArgumentNullException("LaneRepository is null");
            }
            _laneAssignRepository = laneRepository;
        }

        [Route("Lanes/Detail/{id}")]
        public LaneAssignmentDetail GetLaneScheduleById(long Id)
        {

            return _laneAssignRepository.GetById(Id);
        }

        [Route("Lanes/Details")]
        public IQueryable<LaneAssignmentDetail> GetLaneSchedule()
        {

            return _laneAssignRepository.Query();
        }

        [Route("Lane/Add"), HttpPost]
        public void GetLaneSchedule(LaneAssignmentDetail lane)
        {
            _laneAssignRepository.Create(lane);
            _unitOfWork.Commit();


            // return _poolRepository.Query();
        }
    }
}
