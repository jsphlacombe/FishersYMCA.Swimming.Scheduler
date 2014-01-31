using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using FishersYMCA.Swimming.WebAPI.Models;
using FishersYMCA.Swimming.Domain;

namespace FishersYMCA.Swimming.WebAPI.DIInstallers
{
    public class RepositoriesInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IContextFactory>().ImplementedBy<ContextFactory>().LifestylePerWebRequest());
            container.Register(
                Component.For<IRepository<Domain.Instructor>>().ImplementedBy<Repository<Domain.Instructor>>().LifestylePerWebRequest());
            container.Register(
                Component.For<IRepository<PoolUsage>>().ImplementedBy<Repository<PoolUsage>>().LifestylePerWebRequest());
            container.Register(
                Component.For<IRepository<LaneAssignmentDetail>>().ImplementedBy<Repository<LaneAssignmentDetail>>().LifestylePerWebRequest());
            container.Register(
                Component.For<IUnitOfWork>().ImplementedBy<EntityFrameworkUnitOfWork>().LifestylePerWebRequest());
        }
    }
}