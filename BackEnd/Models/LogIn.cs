using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Web_App.Models
{
  [Table("LogIns")]

  public class LogIn
  {
    [Key]
    public int UserId { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
  }
}