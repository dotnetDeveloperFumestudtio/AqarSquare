
using System.Collections.Generic;
using System.IO;
using System.ServiceModel;
using AqarSquare.Engine.BusinessEntities;

namespace AqarSquare.Engine
{
  [ServiceContract]
  public interface IAqarSquareService
  {
    [OperationContract]
    List<SystemUserBackend> GetAllSystem();
  }
}
