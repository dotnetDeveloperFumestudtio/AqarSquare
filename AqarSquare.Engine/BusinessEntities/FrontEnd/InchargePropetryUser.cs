
using System.Collections.Generic;

namespace AqarSquare.Engine.BusinessEntities.FrontEnd
{
  public class InchargePropetryUser
  { 
    public string WhatsApp { get; set; }
    public List<Phone> PhoneList { get; set; }
    public string Viber { get; set; }
    public string  Mail { get; set; }
  }

  public class Phone
  {
    public string PhoneNumber { get; set; }
  }
}
