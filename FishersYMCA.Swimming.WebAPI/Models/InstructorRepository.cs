using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FishersYMCA.Swimming.WebAPI.Models;
using FishersYMCA.Swimming.Domain;


namespace FishersYMCA.Swimming.WebAPI.Models
{
  
    //public class InstructorRepository<TEntity> : IRepository<TEntity> where TEntity : Entity
    //{
    //    private List<Instructor> instructors = new List<Instructor>();
    //    private int _nextId = 1;

    //    public InstructorRepository()
    //    {
    //        SwimDataEntities swDataContext = new SwimDataEntities();
    //        //swDataContext.Instructors;


    //        Add(new Instructor { FirstName = "Joe", LastName = "LaCombe" });
    //        Add(new Instructor { FirstName = "Kristy", LastName = "LaCombe" });
    //        Add(new Instructor { FirstName = "John", LastName = "Vester" });
    //        Add(new Instructor { FirstName = "Todd", LastName = "Bauer" });
    //        Add(new Instructor { FirstName = "Joseph", LastName = "LaCombe" });
    //        Add(new Instructor { FirstName = "Timmy", LastName = "LaCombe" });
    //        Add(new Instructor { FirstName = "Abbey", LastName = "LaCombe" });
    //    }

    //    public IEnumerable<Instructor> GetAll()
    //    {
    //        return instructors;
    //    }

    //    public String Get(int id)
    //    {
    //        var instructor = instructors.Find(p => p.ID == id);
    //        return instructor == null ? string.Empty : instructor.FirstName ;
    //    }

    //    public Instructor Add(Instructor instructor)
    //    {
    //        if (instructor == null)
    //        {
    //            throw new ArgumentNullException("instructor");
    //        }
    //        instructor.ID = _nextId++;
    //        instructors.Add(instructor);
    //        return instructor;
    //    }
    //}
}