using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web_App.Controllers
{
  public class FileResult
  {
    public Guid FileId { get; set; }
    public bool Success { get; set; }
    public string ErrorMessage { get; set; }
  }
}
