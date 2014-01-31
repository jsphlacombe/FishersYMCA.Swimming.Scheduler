using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using FishersYMCA.Swimming.Domain;

namespace FishersYMCA.Swimming.WebAPI.Models
{
    public interface IBaseDbContext : IDisposable
    {
        int SaveChanges();
        IDbSet<T> Set<T>() where T : Entity;
        DbEntityEntry<T> Entry<T>(T entity) where T : Entity;
    }
}
