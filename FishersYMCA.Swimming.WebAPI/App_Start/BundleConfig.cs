using System.Web;
using System.Web.Optimization;

namespace FishersYMCA.Swimming.WebAPI
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-1.11.0.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-1.10.4.custom.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.unobtrusive*",
            //            "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

           // bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/themes/smoothness/jquery-ui-1.10.4.custom.css",
                        "~/Content/scheduler.css"));

            bundles.Add(new StyleBundle("~/Content/bootstrap").Include(
            "~/Content/Bootstrap/css/bootstrap.css",
            "~/Content/Bootstrap/css/bootstrap-theme.css"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
            "~/Scripts/app/swim-gen.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            "~/Scripts/bootstrap/bootstrap.js",
            "~/Scripts/bootstrap/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/require").Include(
            "~/Scripts/require.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
            "~/Scripts/knockout-2.2.0.js"));
        }
    }
}