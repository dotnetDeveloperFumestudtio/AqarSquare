//using AqarSquare.Engine.Entities;
using System;
using System.Collections.Generic;
using AqarSquare.Engine.Entities;

namespace AqarSquare.Engine.BusinessEntities.FrontEnd
{

  public class PropertyService
  {
    public int Id { get; set; }
    public string Title { get; set; }
 
    public int? UserId { get; set; }
 
    public bool? Approved { get; set; }
    public string Description { get; set; } 
    public int? Price { get; set; }
    public string Currency { get; set; }
    public string Late { get; set; }
    public string Long { get; set; }
    public int? Space { get; set; }

 
    public int? RoomsNo { get; set; }
    public int? BathroomNo { get; set; }
    public int? Floor { get; set; }
    public string PropertyId { get; set; } 
    public string PropertyTypeName { get; set; }
    public string ContractTypeName { get; set; }
 
    public int? PropertyType { get; set; }
    public int? BedroomNo { get; set; }
 
    public int? ReceptionNo { get; set; }
 
    public bool? Lift { get; set; }
 
    public bool? AirCondtion { get; set; }
 
    public bool? Balacony { get; set; }
 
    public bool? Garden { get; set; }
 
    public bool? Garage { get; set; }
 
    public bool? Pool { get; set; }
    public string Address { get; set; } 
 
    public int? Area { get; set; }
    public DateTime? CreatedDate { get; set; }
 
    public int? CreatedBy { get; set; }
 
    public int? ContractType { get; set; }
 
    public List<ImageBedroom> ListImageBedroom { get; set; }
 
    public List<ImageBalacony> ListImageBalacony { get; set; }
 
    public List<ImagePool> ListImagePool { get; set; }
 
    public List<ImageReception> ListImageReception { get; set; }
 
    public List<ImageGarden> ListImageGarden { get; set; }

 
    public List<ImageBathroom> ListImageBathroom { get; set; }

    public List<string> ImagesList { get; set; }
    public List<string> ImagesList360 { get; set; } 
    public InchargePropetryUser UserInCharge { get; set; }


  }
}