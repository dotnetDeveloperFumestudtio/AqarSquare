
using System;

namespace AqarSquare.Engine.BusinessEntities.BackEnd
{

  public class PropertyInfo
  {
    public string FirstName { get; set; }
    public string Email { get; set; }
    public string UserPhone { get; set; }
    public bool? Status { get; set; }
    public DateTime? CreatedDate { get; set; }
    public int? CreatedBy { get; set; }
    public string CreatedByUserName { get; set; }
    public int ViewCount { get; set; }

  }
}