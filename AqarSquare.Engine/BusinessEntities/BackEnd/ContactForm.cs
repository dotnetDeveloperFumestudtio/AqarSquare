using System.Text.RegularExpressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using System.Data;

namespace AqarSquares
{

  public class ContactFormBackend
  {
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
    public DateTime? CreatedDate { get; set; }
    public int? UserId { get; set; }
    public int? ApprovedBy { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public bool IsTenant { get; set; }
  }
}