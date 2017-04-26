using System.Collections.Generic;

namespace AqarSquare.Engine.BusinessEntities.FrontEnd
{

  public class SearchOptions
  {
    public List<ContractTypeService> ContractType { get; set; }
    public List<PropertyTypeService> Property { get; set; }
    public List<SpaceRangeService> SpaceRange { get; set; }
    public List<PriceRangeService> PriceRange { get; set; }
    public List<CityService> City { get; set; }
  }
}