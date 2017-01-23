
using System;

namespace AqarSquare.Engine.BusinessEntities.BackEnd
{

  public class PhotoSession
  {
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string PropertyId { get; set; }
    public bool? Status { get; set; }
    public DateTime? CreatedDate { get; set; }
    public int? CreatedBy { get; set; }
    public string CreatedByUserName { get; set; }
    public int? ApprovedBy { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public int ViewCount { get; set; }

  }
}