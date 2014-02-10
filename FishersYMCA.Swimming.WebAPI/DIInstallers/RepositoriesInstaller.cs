using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using FishersYMCA.Swimming.WebAPI.Models;
using FishersYMCA.Swimming.WebAPI.ViewModels;
using FishersYMCA.Swimming.Domain.Data;
using System.Collections.Generic;

namespace FishersYMCA.Swimming.WebAPI.DIInstallers
{
    public class RepositoriesInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IContextFactory>().ImplementedBy<ContextFactory>().LifestylePerWebRequest());
            container.Register(
                Component.For<IRepository<Instructor>>().ImplementedBy<Repository<Instructor>>().LifestylePerWebRequest());
            container.Register(
                Component.For<IRepository<PoolUsage>>().ImplementedBy<Repository<PoolUsage>>().LifestylePerWebRequest());
            container.Register(
                Component.For<IRepository<LaneAssignment>>().ImplementedBy<Repository<LaneAssignment>>().LifestylePerWebRequest());
            container.Register(
                Component.For<IUnitOfWork>().ImplementedBy<EntityFrameworkUnitOfWork>().LifestylePerWebRequest());

        }
    }
}