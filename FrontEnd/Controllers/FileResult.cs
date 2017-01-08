using System;

namespace Web_App.Controllers
{
  public class FileResult
  {
    public Guid FileId { get; set; }
    public bool Success { get; set; }
    public string ErrorMessage { get; set; }
  }
}
