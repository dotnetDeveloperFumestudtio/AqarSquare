using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using AqarSquare.Engine.Entities;

namespace AqarSquare.Engine.BusinessEntities.BackEnd
{

  public class PropertyBackend
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string TitleAr { get; set; }
    public int? UserId { get; set; }
    public bool? Status { get; set; }
    public string Description { get; set; }
    public string DescriptionAr { get; set; }
    public string Late { get; set; }
    public string Long { get; set; }
    public int? Price { get; set; }
    public int Discount { get; set; }
    public int DiscountValue { get; set; }
    public int? RoomsNo { get; set; }
    public int? BathroomNo { get; set; }
    public int? Floor { get; set; }
    public string PropertyId { get; set; }
    public string CreatedByUserName { get; set; }
    public string PropertyTypeName { get; set; }
    public string Currency { get; set; }
    public int? PropertyType { get; set; }
    public int? BedroomNo { get; set; }
    public int? ReceptionNo { get; set; }
    public bool? Lift { get; set; }
    public bool? Balacony { get; set; }
    public bool? Garden { get; set; }
    public bool? Garage { get; set; }
    public bool? Pool { get; set; }
    public string Address { get; set; }
    public string AddressAr { get; set; }
    public int? Area { get; set; }
    public DateTime? CreatedDate { get; set; }
    public int? CreatedBy { get; set; }
    public int? ApprovedBy { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public int? ContractType { get; set; }
    public List<ImageBedroom> ListImageBedroom { get; set; }
    public List<ImageBalacony> ListImageBalacony { get; set; }
    public List<ImagePool> ListImagePool { get; set; }
    public List<ImageReception> ListImageReception { get; set; }
    public List<ImageGarden> ListImageGarden { get; set; }

    public List<ImageBathroom> ListImageBathroom { get; set; }

    public string ApprovedByUserName { get; set; }

    public int? Space { get; set; }
    public int? UserInCharge { get; set; }
  }
}