using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FishersYMCA.Swimming.Domain;

namespace FishersYMCA.Swimming.WebAPI.Models
{
    //public interface IRepository
    //{
    //    IEnumerable<Instructor> GetAll();
    //    String Get(int id);
    //    Instructor Add(Instructor swiminstructor);
    //}

    public interface IRepository<TEntity> where TEntity : Entity
    {
        IQueryable<TEntity> Query();

        TEntity GetById(long id);

        void Create(TEntity entityToCreate);
        void Create(IList<TEntity> entitiesToCreate);

        void Update(TEntity entityToUpdate);
        void Update(TEntity entityToUpdate, TEntity entityOnContext);
        void Update(IList<TEntity> entitiesToUpdate);

        void Delete(long id);
        void Delete(IList<long> ids);
        void Delete(TEntity entityToDelete);
        void Delete(IList<TEntity> entitiesToDelete);
    }
}
