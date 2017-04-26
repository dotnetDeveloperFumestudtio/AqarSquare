using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using AqarSquare.Engine.BusinessEntities.FrontEnd;
using AqarSquare.Engine.Entities;

namespace AqarSquare.Engine.Helper
{

  public class HelperMethods
  {
    static readonly AqarSquaresEntities _context = new AqarSquaresEntities();

     

    public static List<string> GetAllPropertyImages360(int propertyId)
    {
      var returnImages = new List<string>();

      var imagesList = _context.Image360.Where(x => x.PropertyId == propertyId && x.Status == true).ToList();
      foreach (var image360 in imagesList)
      {

        returnImages.Add(
            image360.Image
        );

      }
      return returnImages;

      //return imagesList.Select(image360 => new Images
      //{
      //  ImageUrl = image360.Image
      //}).ToList();
    }

    public static List<string> GetAllPropertyImages(int propertyId)
    {
      var returnImages = new List<string>();
      var bedroomImages = GetAllImageBedroom(propertyId);
      var bathroomImages = GetAllImageBathroom(propertyId);
      var poolImages = GetAllImagePool(propertyId);
      var gardenImages = GetAllImageGarden(propertyId);
      var receptionImages = GetAllImageReception(propertyId);
      var balaconyImages = GetAllImageBalacony(propertyId);
      var imagesList = new List<Images>();
      imagesList = bedroomImages.Select(bedroomImage => new Images
    {
      ImageUrl = bedroomImage.Image
    }).ToList();
      imagesList.AddRange(bathroomImages.Select(bathroomObj => new Images
      {
        ImageUrl = bathroomObj.Image
      }));
      imagesList.AddRange(poolImages.Select(poolObj => new Images
      {
        ImageUrl = poolObj.Image
      }));

      imagesList.AddRange(gardenImages.Select(gardenObj => new Images
      {
        ImageUrl = gardenObj.Image
      }));

      imagesList.AddRange(receptionImages.Select(receptionObj => new Images
      {
        ImageUrl = receptionObj.Image
      }));
      imagesList.AddRange(balaconyImages.Select(balaconyObj => new Images
      {
        ImageUrl = balaconyObj.Image
      }));
      foreach (var image in imagesList)
      {
        returnImages.Add(
            image.ImageUrl
        );

      }
      return returnImages;
    }

    public static List<ImageBedroom> GetAllImageBedroom(int propertyId)
    {
      return _context.ImageBedrooms.Where(x => x.PropertyId == propertyId && x.Status == true).ToList();
    }

    public static List<ImagePool> GetAllImagePool(int propertyId)
    {
      return _context.ImagePools.Where(x => x.PropertyId == propertyId && x.Status == true).ToList();
    }

    public static List<ImageGarden> GetAllImageGarden(int propertyId)
    {
      return _context.ImageGardens.Where(x => x.PropertyId == propertyId && x.Status == true).ToList();
    }

    public static List<ImageReception> GetAllImageReception(int propertyId)
    {
      return _context.ImageReceptions.Where(x => x.PropertyId == propertyId && x.Status == true).ToList();
    }

    public static List<ImageBathroom> GetAllImageBathroom(int propertyId)
    {
      return _context.ImageBathrooms.Where(x => x.PropertyId == propertyId && x.Status == true).ToList();
    }

    public static List<ImageBalacony> GetAllImageBalacony(int propertyId)
    {
      return _context.ImageBalaconies.Where(x => x.PropertyId == propertyId && x.Status == true).ToList();
    }

    public static string GetPropertyTypeById(RequestClass requestClass, int? propertyTypeId)
    {
      var obj = _context.PropertyTypes.FirstOrDefault(p => p.Id == propertyTypeId);

      if (obj != null)

        return (requestClass.Lang == "ar") ? obj.TitleAr : obj.Title;
      else
        return null;
    }

    public static string GetContractTypeById(RequestClass requestClass, int? contractTypeId)
    {
      var obj = _context.ContractTypes.FirstOrDefault(p => p.Id == contractTypeId);

      if (obj != null)
        return (requestClass.Lang == "ar") ? obj.TitleAr : obj.Title;
      else
        return null;
    }

    public string GetUserNameById(int? id)
    {
      SystemUser _user = _context.SystemUsers.FirstOrDefault(user => user.Id == id);

      if (_user != null)
        return _user.FirstName + " " + _user.LastName;
      else
        return null;
    }

    public static InchargePropetryUser InchargePropetryUser(int? userId)
    {
      var result = new InchargePropetryUser();
      var obj = _context.UserContacts.FirstOrDefault(p => p.UserId == userId);

      //if (obj != null)
      //{
      var phone = new List<Phone>();

      //var obj = Context.UserContacts.FirstOrDefault(p => p.UserId == userId);

      if (obj != null)
      {
        phone.Add(new Phone
        {
          PhoneNumber = obj.Phone
        });
        result.WhatsApp = obj.WhatsApp;
        result.Viber = obj.Viber;
        result.PhoneList = phone;
        return result;
      }
      else
        return null;
    }

    public static PriceRangeService GetPriceRangeId(int? priceRangeId)
    {
      var result = new PriceRangeService();
      var obj = _context.PriceAverages.FirstOrDefault(p => p.Id == priceRangeId);

      if (obj != null)
      {
        result.Id = obj.Id;
        result.From = obj.PriceFrom;
        result.To = obj.PriceTo;
        return result;
      }
      else
        return null;
    }

    public static SpaceRangeService GetSpaceRangeId(int? spaceRangeId)
    {
      var result = new SpaceRangeService();
      var obj = _context.SpaceAverages.FirstOrDefault(p => p.Id == spaceRangeId);

      if (obj != null)
      {
        result.Id = obj.Id;
        result.From = obj.SpaceFrom;
        result.To = obj.SpaceTo;
        return result;
      }
      else
        return null;
    }

    #region Helper Search Option
    public static List<ContractTypeService> ContractTypesList(RequestClass requestClass)
    {
      var returnContractTy = new List<ContractTypeService>();
      var typeObj = _context.ContractTypes.Where(x => x.Status == true).ToList();
      foreach (var item in typeObj)
      {
        returnContractTy.Add(new ContractTypeService
        {
          Id = item.Id,
          Title = (requestClass.Lang == "ar") ? item.TitleAr : item.Title
        });
      }
      return returnContractTy;
    }
    public static List<PropertyTypeService> PropertyTypesList(RequestClass requestClass)
    {
      var returnContractTy = new List<PropertyTypeService>();
      var typeObj = _context.PropertyTypes.Where(x => x.Status == true).ToList();
      foreach (var item in typeObj)
      {
        returnContractTy.Add(new PropertyTypeService
        {
          Id = item.Id,
          Title = (requestClass.Lang == "ar") ? item.TitleAr : item.Title
        });
      }
      return returnContractTy;
    }
    public static List<PriceRangeService> PriceRangeList()
    {
      var returnPriceRange = new List<PriceRangeService>();
      var priceObj = _context.PriceAverages.ToList().OrderByDescending(x => x.Id);

      if (priceObj.Any())
      {
        foreach (var item in priceObj)
        {
          returnPriceRange.Add(new PriceRangeService
          {
            Id = item.Id,
            Range = item.PriceFrom + " : " + item.PriceTo
          });
        }
      }
      return returnPriceRange;
    }
    public static List<SpaceRangeService> SpaceRangeList()
    {
      var returnSpaceRange = new List<SpaceRangeService>();
      var priceObj = _context.SpaceAverages.ToList().OrderByDescending(x => x.Id);

      if (priceObj.Any())
      {
        foreach (var item in priceObj)
        {
          returnSpaceRange.Add(new SpaceRangeService
          {
            Id = item.Id,
            Range = item.SpaceFrom + " : " + item.SpaceTo
          });
        }
      }
      return returnSpaceRange;
    }
    public static List<CityService> CityList(RequestClass requestClass)
    {
      var returnCity = new List<CityService>();
      var cityObj = _context.Cities.Where(x => x.Status == true).ToList().OrderByDescending(x => x.Id);

      if (cityObj.Any())
      {
        foreach (var item in cityObj)
        {
          returnCity.Add(new CityService
          {
            Id = item.Id,
            Title = (requestClass.Lang == "ar") ? item.TitleAr : item.Title
          });
        }
      }
      return returnCity;
    }

    #endregion
    public static int RandNumber(int low, int high)
    {
      var rndNum = new Random(int.Parse(Guid.NewGuid().ToString().Substring(0, 8), System.Globalization.NumberStyles.HexNumber));
      var rnd = rndNum.Next(low, high);
      return rnd;
    }

  }

  public class RequestClass
  {
    [DataMember]
    public string CityId { get; set; }
    [DataMember]
    public string Lang { get; set; }
    [DataMember]
    public int SquareId { get; set; }
    [DataMember]
    public int ContractTypeId { get; set; }
    [DataMember]
    public int PropertyTypeId { get; set; }
    [DataMember]
    public int PriceRangeId { get; set; }
    [DataMember]
    public int SpaceRangeId { get; set; }

    public int LastId { get; set; }

    public int Count { get; set; }
  }
}
