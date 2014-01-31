using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Reflection;
using FishersYMCA.Swimming.Domain;
using FishersYMCA.Swimming.WebAPI.Models.Data;

namespace FishersYMCA.Swimming.WebAPI.Models
{
    public class SwimDbBaseDbContext : DbContext, IBaseDbContext
    {
        public SwimDbBaseDbContext()
            : base("SwimDataEntities")
        {
           
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            //ConfigureModel(modelBuilder);

            //new MigrateDatabaseToLatestVersion<KartDbBaseDbContext, Configuration>());

            //base.OnModelCreating(modelBuilder);
        }

        private static void ConfigureModel(DbModelBuilder modelBuilder)
        {
            var entityMethod = typeof(DbModelBuilder).GetMethod("Entity");

            var entityTypes = Assembly.GetAssembly(typeof(Entity)).GetTypes()
                .Where(x => x.IsSubclassOf(typeof(Entity)) && !x.IsAbstract);
            foreach (var type in entityTypes)
            {
                entityMethod.MakeGenericMethod(type).Invoke(modelBuilder, new object[] { });
            }
        }

        public new IDbSet<T> Set<T>() where T : Entity
        {
            return base.Set<T>();
        }

        public new DbEntityEntry<T> Entry<T>(T entity) where T : Entity
        {
            return base.Entry(entity);
        }

        public DbSet<Instructor> Instructors { get; set; }
        //public DbSet<MainLapPool> MainLapPools { get; set; }
        //public DbSet<PoolUsageType> PoolUsageTypes { get; set; }
        //public DbSet<Student> Students { get; set; }
    }
}
