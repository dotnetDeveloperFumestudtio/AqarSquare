using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Web_App.Startup))]
namespace Web_App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
           // ConfigureAuth(app);
        }
    }
}
