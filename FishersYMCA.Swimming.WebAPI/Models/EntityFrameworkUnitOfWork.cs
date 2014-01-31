namespace FishersYMCA.Swimming.WebAPI.Models
{
    public interface IUnitOfWork
    {
        void Commit();
        //void Rollback();
    }

    public class EntityFrameworkUnitOfWork : IUnitOfWork
    {
        private readonly IContextFactory _contextFactory;
        private IBaseDbContext _context;
        protected IBaseDbContext Context
        {
            get { return _context ?? (_context = _contextFactory.Get()); }
        }

        public EntityFrameworkUnitOfWork(IContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }

        #region Implementation of IUnitOfWork

        public void Commit()
        {
            Context.SaveChanges();
        }

        #endregion

        #region Implementation of IDisposable

        public void Dispose()
        {
            _context.Dispose();
        }

        #endregion
    }
}
