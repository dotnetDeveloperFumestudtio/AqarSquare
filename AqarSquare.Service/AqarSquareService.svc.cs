using System.Collections.Generic;
using System.IO;
using System.ServiceModel.Web;
using AqarSquare.Engine;
using AqarSquare.Engine.BusinessEntities;

namespace AqarSquare.Service
{
  // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
  // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
  public class AqarSquareService : IAqarSquareService
  {
    [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetAllSystem")]
    public  List<SystemUserBackend> GetAllSystem()
    {
      return new EngineManager().GetAllSystem();
    }  
  }
}
