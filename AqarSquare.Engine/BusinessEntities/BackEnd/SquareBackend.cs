using System;

namespace AqarSquare.Engine.BusinessEntities.BackEnd
{

  public class SquareBackend
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string TitleAr { get; set; }
    public bool? Status { get; set; }
    public int? CityId { get; set; }
    public DateTime? CreatedDate { get; set; }
    public int? CreatedBy { get; set; }
    public string CreatedByUserName { get; set; }
    public string CityTitle { get; set; }

  }
}