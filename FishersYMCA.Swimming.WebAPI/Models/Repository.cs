using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using FishersYMCA.Swimming.Domain;

namespace FishersYMCA.Swimming.WebAPI.Models
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        private readonly IContextFactory _contextFactory;
        private IBaseDbContext _baseDbContext;
        private IDbSet<TEntity> _dbSet;
    
        public Repository(IContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }

        protected IBaseDbContext BaseDbContext
        {
            get { return _baseDbContext ?? (_baseDbContext = _contextFactory.Get()); }
        }

        public IDbSet<TEntity> DbSet
        {
            get { return _dbSet ?? (_dbSet = BaseDbContext.Set<TEntity>()); }
        }        

        #region Implementation of IRepository<TEntity>

        public IQueryable<TEntity> Query()
        {
            IQueryable<TEntity> query = DbSet;
            return query;
        }

        public TEntity GetById(long id)
        {
            return DbSet.Find(id);
        }

        public void Create(TEntity entityToCreate)
        {
            DbSet.Add(entityToCreate);
        }

        public void Create(IList<TEntity> entitiesToCreate)
        {
            foreach (var entity in entitiesToCreate)
            {
                Create(entity);
            }
        }

        public void Update(TEntity entityToUpdate)
        {
            DbSet.Attach(entityToUpdate);
        }

        public void Update(TEntity entityToUpdate, TEntity entityOnContext)
        {
            _baseDbContext.Entry(entityOnContext).CurrentValues.SetValues(entityToUpdate);
        }

        public void Update(IList<TEntity> entitiesToUpdate)
        {
            foreach (var entity in entitiesToUpdate)
            {
                Update(entity);
            }
        }

        public void Delete(long id)
        {
            var entityToDelete = DbSet.Find(id);
            Delete(entityToDelete);
        }

        public void Delete(IList<long> ids)
        {
            foreach (var id in ids)
            {
                Delete(id);
            }
        }

        public void Delete(TEntity entityToDelete)
        {
            if (_baseDbContext.Entry(entityToDelete).State == EntityState.Detached)
            {
                DbSet.Attach(entityToDelete);
            }
            DbSet.Remove(entityToDelete);
        }

        public void Delete(IList<TEntity> entitiesToDelete)
        {
            foreach (var entity in entitiesToDelete)
            {
                Delete(entity);
            }
        }

        #endregion Implementation of IRepository<TEntity>
    }
}
