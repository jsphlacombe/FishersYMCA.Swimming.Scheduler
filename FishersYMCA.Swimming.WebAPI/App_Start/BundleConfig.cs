using System.Web;
using System.Web.Optimization;

namespace FishersYMCA.Swimming.WebAPI
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            //Core javascript framework libraries
            bundles.Add(new ScriptBundle("~/bundles/core").Include(
                "~/Scripts/jquery-1.11.0.js",
                "~/Scripts/jquery-ui-1.10.4.custom.js",
                "~/Scripts/modernizr-*",
                "~/Scripts/bootstrap/bootstrap.js",
                "~/Scripts/bootstrap/bootstrap.min.js",
                "~/Scripts/knockout-2.2.0.js"
                ));

            //CSS files
            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/themes/smoothness/jquery-ui-1.10.4.custom.css",
                        "~/Content/Bootstrap/css/bootstrap.css",
                        "~/Content/Bootstrap/css/bootstrap-theme.css",
                        "~/Content/scheduler.css"));


            //Custom application javascript libraries
            bundles.Add(new ScriptBundle("~/bundles/app").Include(
            "~/Scripts/app/swim-gen.js",
            "~/Scripts/app/pool.js",
            "~/Scripts/app/schedule.js"));

        }
    }
}