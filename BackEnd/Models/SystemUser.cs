using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Web_App.Models
{
  [Table("SystemUsers")]
  public class SystemUser
  {
    [Key]
    public int Id { get; set; }
    public string UserName { get; set; } 
    public string UserIp { get; set; }
    public string ComputerName { get; set; }
    public Boolean Connected { get; set; }
    public DateTime ConnectedDate { get; set; }
    public DateTime DisconnectedDate { get; set; }
  }
}