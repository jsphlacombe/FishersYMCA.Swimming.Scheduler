using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FishersYMCA.Swimming.WebAPI.Models;
using FishersYMCA.Swimming.WebAPI.ViewModels;
using FishersYMCA.Swimming.Domain.Data;


namespace FishersYMCA.Swimming.WebAPI.Controllers
{
    public class LaneAssignController : ApiController
    {
        private readonly IRepository<LaneAssignment> _laneAssignRepository;
 
        private readonly IUnitOfWork _unitOfWork;

        public LaneAssignController(IRepository<LaneAssignment> laneRepository)
        {
            if (laneRepository == null)
            {
                throw new ArgumentNullException("LaneRepository is null");
            }
            _laneAssignRepository = laneRepository;
        }

        [Route("Lanes/Detail/{id}")]
        public IQueryable<LaneDetail> GetLaneScheduleById(long Id)
        {
            return _laneAssignRepository.Query().
               Where(x => x.ID == Id)
               .Select(x => new LaneDetail
               {

                   InstructorName = x.InstructorName,
                   InstructorPhone = x.InstructorPhone,
                   StudentName = x.StudentName,
                   StudentPhone = x.StudentPhone,
                   AssignmentDetails = x.AssignmentDetails

               });
           // return _laneAssignRepository.GetById(Id);
        }

        [Route("Lanes/Details")]
        public IQueryable<LaneAssignment> GetLaneSchedule()
        {

            return _laneAssignRepository.Query();
        }

        [Route("Lane/Add"), HttpPost]
        public void GetLaneSchedule(LaneAssignment lane)
        {
            _laneAssignRepository.Create(lane);
            _unitOfWork.Commit();


            // return _poolRepository.Query();
        }
    }
}
