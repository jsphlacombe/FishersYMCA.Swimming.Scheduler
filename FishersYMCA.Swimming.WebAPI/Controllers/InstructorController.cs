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
    public class InstructorController : ApiController
    {
        private readonly IRepository<Instructor> _instructorRepository;
 
        private readonly IUnitOfWork _unitOfWork;
        public InstructorController(IRepository<Domain.Instructor> instructorRepository)
        {       
            if (instructorRepository == null)
            {
                throw new ArgumentNullException("instructorRepository is null");
            }
            _instructorRepository = instructorRepository;
        }

        [Route("Instructor/{id}")]
        public Instructor GetInstructorById(long Id)
        {

            return _instructorRepository.GetById(Id);
        }

        [Route("Instructors")]
        public IQueryable<Instructor> GetInstructors()
        {

            return _instructorRepository.Query();
        }
    }
}
