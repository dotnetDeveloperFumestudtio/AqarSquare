using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Web_App.Models
{ 
  [Table("Messages")] 
  public class Message
  {
    [Key]
    public int Id { get; set; }
    public string MsgTitle { get; set; }
    public string MsgContent { get; set; }
    public DateTime MsgDateTime { get; set; }
  }
}