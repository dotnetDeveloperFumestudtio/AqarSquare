using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Web_App.Models
{
  [Table("UserMsgs")]

  public class UserMsg
  {
    [Key]
    public int Id { get; set; }
    public int UserId { get; set; }
    public int MsgId { get; set; }
    public Boolean Delivered { get; set; }
    public DateTime DeliveredDateTime { get; set; }
    public Boolean Readed { get; set; }
    public DateTime ReadedDateTime { get; set; }
  }
}