using System;
using System.Collections.Generic;
using System.Data;
//using System.Data.Entity;
//using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using FishersYMCA.Swimming.WebAPI.Models;
using FishersYMCA.Swimming.Domain.Data;

namespace FishersYMCA.Swimming.WebAPI.Controllers
{
    public class StudentController : ApiController
    {
        private readonly IRepository<Instructor> _studentRepository;
 
        private readonly IUnitOfWork _unitOfWork;
        public StudentController(IRepository<Instructor> instructorRepository)
        {       
            if (instructorRepository == null)
            {
                throw new ArgumentNullException("studentRepository is null");
            }
            _studentRepository = instructorRepository;
        }

        [Route("Student/{id}")]
        public string GetInstructorById(long Id)
        {

            return _studentRepository.GetById(Id).FirstName;
        }
    }
}