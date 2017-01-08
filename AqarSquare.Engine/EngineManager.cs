
using System.Text.RegularExpressions;
using AqarSquare.Engine.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.ServiceModel.Web;
using AqarSquare.Engine.BusinessEntities.BackEnd;
using AqarSquare.Engine.Entities;


namespace AqarSquare.Engine
{
  public class EngineManager : IAqarSquareService
  {
    private const string DefaultDateFormatterString = "yyyy MM dd hh:mm:ss tt";
    //Set the time zone information to US Mountain Standard Time 
    static readonly TimeZoneInfo TimeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("Egypt Standard Time");
    //Get date and time in US Mountain Standard Time 
    readonly DateTime _publicdateTime = TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo);
    readonly AqarSquaresEntities _context = new AqarSquaresEntities();

    public HeaderData Header { get; set; }

    public EngineManager()
    {
      Header = new HeaderData();
      if (WebOperationContext.Current != null)
      {
        IncomingWebRequestContext request = WebOperationContext.Current.IncomingRequest;
        WebHeaderCollection headers = request.Headers;
        foreach (string key in headers.AllKeys)
        {
          switch (key)
          {
            case "CurrentLanguage":
              if (headers[key].ToLower() == "ar".ToLower())
                Header.CurrentLanguage = Languages.Arabic;
              else
                Header.CurrentLanguage = Languages.English;
              break;
            case "CurrentDevice":
              if (headers[key].ToLower() == "iOS".ToLower())
                Header.CurrentDevice = Devices.iOS;
              else if (headers[key].ToLower() == "Android".ToLower())
                Header.CurrentDevice = Devices.Android;
              else
                Header.CurrentDevice = Devices.Other;
              break;
            case "UserToken":
              Header.UserToken = headers[key];
              break;
            case "AppVersion":
              Header.AppVersion = headers[key];
              break;
            default:
              break;
          }
        }
      }
    }


    #region Helper methods

    public string GetUserNameById(int? id)
    {
      var _user = _context.SystemUsers.FirstOrDefault(user => user.Id == id);

      if (_user != null)
        return _user.FirstName + " " + _user.LastName;
      else
        return null;
    }

    #endregion

    #region Non-Service Methods



    //public List<SystemUser> GetSystemUsers()
    //{
    //  List<SystemUser> result = new List<SystemUser>();
    //  using (Entities.Entities context = new Entities.Entities())
    //  {
    //    foreach (SystemUserEntity item in context.SystemUserEntities)
    //    {
    //      result.Add(new SystemUser(item, Header));
    //    }
    //  }
    //  return result;
    //}

    //public bool CheckUserNameandMail(SystemUser systemUser)
    //{
    //  using (Entities.Entities context = new Entities.Entities())
    //  {
    //    SystemUserEntity newEntity = new SystemUserEntity();

    //    SystemUserEntity _user =
    //      context.SystemUserEntities.Where(user => user.Email == systemUser.Email || user.Name == systemUser.Name)
    //        .FirstOrDefault();

    //    if (_user != null)
    //      return false;
    //    else
    //      return true;
    //  }
    //}

    //public SystemUser AddSystemUser(SystemUser systemUser)
    //{
    //  using (Entities.Entities context = new Entities.Entities())
    //  {
    //    SystemUserEntity newEntity = new SystemUserEntity();
    //    systemUser.FillDBEntity<SystemUserEntity>(ref newEntity);
    //    context.SystemUserEntities.Add(newEntity);
    //    context.SaveChanges();
    //    systemUser.Convert<SystemUserEntity>(newEntity);
    //  }
    //  return systemUser;
    //}

    //public SystemUser GetSystemUser(int id)
    //{
    //  SystemUser result = null;
    //  using (Entities.Entities context = new Entities.Entities())
    //  {
    //    SystemUserEntity systemUser = context.SystemUserEntities.FirstOrDefault(item => item.SystemUserID == id);
    //    if (systemUser != null)
    //    {
    //      result = new SystemUser(systemUser, Header);
    //    }
    //  }
    //  return result;
    //}

    //public SystemUser UpdateSystemUser(SystemUser systemUser)
    //{
    //  using (Entities.Entities context = new Entities.Entities())
    //  {
    //    SystemUserEntity entity =
    //      context.SystemUserEntities.Where(item => item.SystemUserID == systemUser.SystemUserID).FirstOrDefault();
    //    if (entity != null)
    //    {
    //      systemUser.FillDBEntity<SystemUserEntity>(ref entity);
    //      context.SaveChanges();
    //      systemUser.Convert<SystemUserEntity>(entity);
    //    }
    //  }
    //  return systemUser;
    //}

    //public void DeleteSystemUser(int id)
    //{
    //  using (Entities.Entities context = new Entities.Entities())
    //  {
    //    SystemUserEntity entity = context.SystemUserEntities
    //      .Where(item => item.SystemUserID == id).FirstOrDefault();
    //    if (entity != null)
    //    {
    //      context.SystemUserEntities.Remove(entity);
    //      context.SaveChanges();
    //    }
    //  }
    //}


    #endregion


    //public bool CheckPermissions(string email, string type)
    //{
    //  bool result = false;
    //  SystemUser user = null;
    //  using (var context = new AqarSquaresEntities())
    //  {
    //    user = context.SystemUsers.FirstOrDefault(item => item.Email.ToLower() == email.ToLower());
    //  }
    //  if (user != null)
    //  {
    //    switch (type)
    //    {
    //      case "AccountController":
    //        result = true;
    //        break;
    //      case "ConciergeController":
    //        result = user.ManageConcierge;
    //        break;
    //      case "EntertainmentController":
    //        result = user.ManageEntertainments;
    //        break;
    //      case "HomeController":
    //        result = true;
    //        break;
    //      case "LimousineController":
    //        result = user.ManageLimousine;
    //        break;
    //      case "LocalBusinessPropertyController":
    //        result = user.ManageLocalBusinessDirectories;
    //        break;
    //      case "NotificationController":
    //        result = user.ManagePushNotifications;
    //        break;
    //      case "RestaurantController":
    //        result = user.ManageEntertainments;
    //        break;
    //      case "RestaurantReservationController":
    //        result = user.ManageEntertainments;
    //        break;
    //      case "SpaController":
    //        result = user.ManageWellnesses;
    //        break;
    //      case "SpaReservationController":
    //        result = user.ManageWellnesses;
    //        break;
    //      case "SystemUserController":
    //        result = user.ManageSystemUsers;
    //        break;
    //      case "TreatmentController":
    //        result = user.ManageWellnesses;
    //        break;
    //      case "WellnessController":
    //        result = user.ManageWellnesses;
    //        break;
    //      case "UnitController":
    //        result = Convert.ToBoolean(user.ManageUnit);
    //        break;
    //      case "AboutController":
    //        result = Convert.ToBoolean(user.ManageAbout);
    //        break;
    //      case "ContactController":
    //        result = Convert.ToBoolean(user.ManageContact);
    //        break;
    //      case "ManageUserController":
    //        result = Convert.ToBoolean(user.ManageApplicationUser);
    //        break;

    //      case "ItemController":
    //        result = Convert.ToBoolean(user.ManageItem);
    //        break;

    //      case "RestaurantCategoryController":
    //        result = Convert.ToBoolean(user.ManageCategoryResturant);
    //        break;


    //      case "OrderReservationController":
    //        result = Convert.ToBoolean(user.ManageOrderReservation);
    //        break;
    //      default:
    //        break;
    //    }
    //  }
    //  return result;
    //}

    public SystemUserBackend GetSystemUserByName(string userName)
    {
      SystemUserBackend result = null;
      //using (var context = new AqarSquaresEntities())
      //{
      SystemUser systemUser = _context.SystemUsers.FirstOrDefault(item => item.FirstName == userName);
      if (systemUser != null)
      {
        result = new SystemUserBackend(systemUser, Header);
      }
      //  }
      return result;
    }

    public List<SystemUserBackend> GetAllSystem()
    {
      var systemUser = _context.SystemUsers.ToList();
      return systemUser.Select(systemUserBackend => new SystemUserBackend
      {
        Email = systemUserBackend.Email,
        FirstName = systemUserBackend.FirstName,
        Id = systemUserBackend.Id
      }).ToList();
    }

    #region BackEnd
    #region City

    public List<CityBackend> GetAllCity()
    {
      var cityObj = _context.Cities.ToList().OrderByDescending(x => x.Id);
      return cityObj.Select(cityBackend => new CityBackend
      {
        Id = cityBackend.Id,
        CreatedBy = cityBackend.CreatedBy,
        CreatedByUserName = GetUserNameById(cityBackend.CreatedBy),
        CreatedDate = cityBackend.CreatedDate,
        Status = cityBackend.Status,
        Title = cityBackend.Title,
        TitleAr = cityBackend.TitleAr
      }).ToList();
    }

    public string CreateCity(CityBackend city)
    {
      if (IsCityNameAvailable(city))
        return "Exist";

      var cityObj = new City();
      try
      {
        cityObj.Title = city.Title;
        cityObj.TitleAr = city.TitleAr;
        cityObj.Status = city.Status;
        cityObj.CreatedBy = city.CreatedBy;
        cityObj.CreatedDate = _publicdateTime;
        _context.Cities.Add(cityObj);
        _context.SaveChanges();

        return "Done";
      }
      catch (Exception)
      {
        return "Error";
        throw;
      }

    }

    public string UpdatedCity(CityBackend city)
    {
      var cityObj = _context.Cities.FirstOrDefault(item => item.Id == city.Id);
      if (cityObj != null)
      {
        cityObj.Title = city.Title;
        cityObj.TitleAr = city.TitleAr;
        cityObj.Status = city.Status;
        cityObj.CreatedBy = city.CreatedBy;
        cityObj.CreatedDate = _publicdateTime;

        _context.SaveChanges();
        return "Done";
      }
      else
        return "Error";


    }

    public string DeleteCity(CityBackend city)
    {
      var cityObj = _context.Cities.FirstOrDefault(item => item.Id == city.Id);
      if (cityObj != null)
      {
        try
        {
          _context.Cities.Remove(cityObj);
          _context.SaveChanges();
          return "Done";

        }
        catch (Exception)
        {
          return "Error";
          throw;
        }

      }
      else
        return "Error";
    }

    public int UpdateCityStatus(int cityId, bool? imageStatus)
    {
      var obj = _context.Cities.FirstOrDefault(item => item.Id == cityId);
      if (obj != null)
      {
        obj.CreatedDate = _publicdateTime;
        obj.Status = imageStatus;
        _context.SaveChanges();
        return 1;
      }
      else
        return 0;

    }
    public bool IsCityNameAvailable(CityBackend keyWords)
    {
      var returnVal = false;

      var categoryObj = _context.Cities.Where(x => x.Title.Contains(keyWords.Title.Trim()) ||
      x.TitleAr.Contains(keyWords.TitleAr.Trim())).ToList();

      if (categoryObj.Any())
        returnVal = true;

      return returnVal;
    }
    #endregion

    #region Square
    public string GetCityTitleId(int? id)
    {
      var obj = _context.Cities.FirstOrDefault(u => u.Id == id);

      if (obj != null)
        return obj.Title + obj.Title;
      else
        return null;
    }

    public List<SquareBackend> GetAllSquare()
    {
      var squareObj = _context.Squares.ToList().OrderByDescending(x => x.Id);

      var squareList = new List<SquareBackend>();

      foreach (var square in squareObj)
      {
        squareList.Add(new SquareBackend
        {
          Id = square.Id,
          CreatedBy = square.CreatedBy,
          CreatedByUserName = GetUserNameById(square.CreatedBy),
          CityId = square.CityId,
          CityTitle = GetCityTitleId(square.CityId),
          CreatedDate = square.CreatedDate,
          Status = square.Status,
          Title = square.Title,
          TitleAr = square.TitleAr
        });

      }
      return squareList;
      //return squareObj.Select(squareBackend => new SquareBackend
      //{
      //  Id = squareBackend.Id,
      //  CreatedBy = squareBackend.CreatedBy,
      //  CreatedByUserName = GetUserNameById(squareBackend.CreatedBy),
      //  CityTitle = GetCityTitleId(squareBackend.CityId),
      //  CreatedDate = squareBackend.CreatedDate,
      //  Status = squareBackend.Status,
      //  Title = squareBackend.Title,
      //  TitleAr = squareBackend.TitleAr
      //}).ToList();
    }

    public string CreateSquare(SquareBackend square)
    {
      if (IsSquareNameAvailable(square))
        return "Exist";

      var squareObj = new Square();
      try
      {
        squareObj.Title = square.Title;
        squareObj.TitleAr = square.TitleAr;
        squareObj.Status = square.Status;
        squareObj.CityId = square.CityId;
        squareObj.CreatedBy = square.CreatedBy;
        squareObj.CreatedDate = _publicdateTime;
        _context.Squares.Add(squareObj);
        _context.SaveChanges();

        return "Done";
      }
      catch (Exception)
      {
        return "Error";
        throw;
      }

    }

    public string UpdatedSquare(SquareBackend square)
    {
      var squareObj = _context.Squares.FirstOrDefault(item => item.Id == square.Id);
      if (squareObj != null)
      {
        squareObj.Title = square.Title;
        squareObj.TitleAr = square.TitleAr;
        squareObj.Status = square.Status;
        squareObj.CityId = square.CityId;
        squareObj.CreatedBy = square.CreatedBy;
        squareObj.CreatedDate = _publicdateTime;

        _context.SaveChanges();
        return "Done";
      }
      else
        return "Error";


    }

    public string DeleteSquare(SquareBackend square)
    {
      var squareObj = _context.Squares.FirstOrDefault(item => item.Id == square.Id);
      if (squareObj != null)
      {
        try
        {
          _context.Squares.Remove(squareObj);
          _context.SaveChanges();
          return "Done";

        }
        catch (Exception)
        {
          return "Error";
          throw;
        }

      }
      else
        return "Error";
    }

    public int UpdateSquareStatus(int squareId, bool? status)
    {
      var obj = _context.Squares.FirstOrDefault(item => item.Id == squareId);
      if (obj != null)
      {
        obj.Status = status;
        obj.CreatedDate = _publicdateTime;
        _context.SaveChanges();
        return 1;
      }
      else
        return 0;

    }
    public bool IsSquareNameAvailable(SquareBackend keyWords)
    {
      var returnVal = false;

      var Obj = _context.Squares.Where(x => x.Title.Contains(keyWords.Title.Trim()) ||
      x.TitleAr.Contains(keyWords.TitleAr.Trim())).ToList();

      if (Obj.Any())
        returnVal = true;

      return returnVal;
    }
    #endregion

    #region Contact

    public ContactUsBackend GetCountactUs()
    {
      var result = new ContactUsBackend();
      var contactObj = _context.ContactUs.FirstOrDefault();
      if (contactObj != null)
      {
        result.Id = contactObj.Id;
        result.PhoneNo = contactObj.PhoneNo;
        result.PhoneNo1 = contactObj.PhoneNo1;
        result.PhoneNo2 = contactObj.PhoneNo2;
        result.Twitter = contactObj.Twitter;
        result.Facebook = contactObj.Facebook;
        result.LinkedIn = contactObj.LinkedIn;
        result.GooglePlus = contactObj.GooglePlus;
        result.Email = contactObj.Email;
        result.WhatsApp = contactObj.WhatsApp;
        result.Viber = contactObj.Viber;
        result.Youtube = contactObj.Youtube;
        result.Late = contactObj.Late;
        result.Long = contactObj.Long;
        result.Address = contactObj.Address;
        result.CreatedDate = contactObj.CreatedDate;
        result.CreatedBy = contactObj.CreatedBy;

      }
      return result;
    }

    public int UpdatedContact(ContactUsBackend contact)
    {
      var contactObj = _context.ContactUs.FirstOrDefault();
      if (contactObj != null)
      {
        contactObj.PhoneNo = contact.PhoneNo;
        contactObj.PhoneNo1 = contact.PhoneNo1;
        contactObj.PhoneNo2 = contact.PhoneNo2;
        contactObj.Twitter = contact.Twitter;
        contactObj.Facebook = contact.Facebook;
        contactObj.LinkedIn = contact.LinkedIn;
        contactObj.GooglePlus = contact.GooglePlus;
        contactObj.Email = contact.Email;
        contactObj.WhatsApp = contact.WhatsApp;
        contactObj.Viber = contact.Viber;
        contactObj.Youtube = contact.Youtube;
        contactObj.Address = contact.Address;
        contactObj.Late = contact.Late;
        contactObj.Long = contact.Long;
        contactObj.CreatedDate = _publicdateTime;
        contactObj.CreatedBy = contact.CreatedBy;

        _context.SaveChanges();

        return 1;

      }
      else
        return 0;

    }

    #endregion

    #region Property

    public List<PropertyBackend> GetAllProperty()
    {
      var propertyObj = _context.Properties.ToList().OrderByDescending(x => x.Id);
      return propertyObj.Select(p => new PropertyBackend
      {
        Id = p.Id,
        PropertyId = p.PropertyId,
        Title = p.Title,
        TitleAr = p.TitleAr,
        Description = p.Description,
        DescriptionAr = p.DescriptionAr,
        Address = p.Address,
        AddressAr = p.AddressAr,
        Late = p.Late,
        Long = p.Long,
        Price = p.Price,
        BathroomNo = p.BathroomNo,
        BedroomNo = p.BedroomNo,
        RoomsNo = p.RoomsNo,
        ReceptionNo = p.ReceptionNo,
        Floor = p.Floor,
        Balacony = p.Balacony,
        Garage = p.Garage,
        Garden = p.Garden,
        Pool = p.Pool,
        Lift = p.Lift,
        Area = p.Area,
        PropertyTypeName = GetPropertyTypeById(p.PropertyType),
        Currency = p.Currency,
        Status = p.Status,
        CreatedBy = p.CreatedBy,
        CreatedByUserName = GetUserNameById(p.CreatedBy),
        CreatedDate = p.CreatedDate,
        ApprovedBy = GetUserNameById(p.ApprovedBy),
        ApprovedDate = p.ApprovedDate
      }).ToList();
    }
    
    public int GenerateRandom(int min, int max)
    {
      var seed = Convert.ToInt32(Regex.Match(Guid.NewGuid().ToString(), @"\d+").Value);
      return new Random(seed).Next(min, max);
    }
    
    public string CreateProperty(PropertyBackend p)
    {
      //if (IsPropertyNameAvailable(property))
      //  return "Exist";

      var propertyObj = new Property();
      try
      {
        propertyObj.PropertyId = GenerateRandom(3, 6).ToString();
        propertyObj.Title = p.Title;
        propertyObj.TitleAr = p.TitleAr;
        propertyObj.Description = p.Description;
        propertyObj.DescriptionAr = p.DescriptionAr;
        propertyObj.Address = p.Address;
        propertyObj.AddressAr = p.AddressAr;
        propertyObj.Price = p.Price;
        propertyObj.BathroomNo = p.BathroomNo;
        propertyObj.BedroomNo = p.BedroomNo;
        propertyObj.RoomsNo = p.RoomsNo;
        propertyObj.ReceptionNo = p.ReceptionNo;
        propertyObj.Floor = p.Floor;
        propertyObj.Balacony = p.Balacony;
        propertyObj.Garage = p.Garage;
        propertyObj.Garden = p.Garden;
        propertyObj.Pool = p.Pool;
        propertyObj.Lift = p.Lift;
        propertyObj.Area = p.Area;
        propertyObj.PropertyType = p.PropertyType;
        propertyObj.Currency = p.Currency;
        propertyObj.Status = false;
        propertyObj.CreatedBy = p.CreatedBy;
        propertyObj.CreatedDate = _publicdateTime;
        _context.Properties.Add(propertyObj);
        _context.SaveChanges();

        return "Done";
      }
      catch (Exception)
      {
        return "Error";
        throw;
      }

    }

    public string UpdatedProperty(PropertyBackend p)
    {
      var propertyObj = _context.Properties.FirstOrDefault(item => item.Id == p.Id);
      if (propertyObj != null)
      {
        propertyObj.Title = p.Title;
        propertyObj.TitleAr = p.TitleAr;
        propertyObj.Description = p.Description;
        propertyObj.DescriptionAr = p.DescriptionAr;
        propertyObj.Address = p.Address;
        propertyObj.AddressAr = p.AddressAr;
        propertyObj.Price = p.Price;
        propertyObj.BathroomNo = p.BathroomNo;
        propertyObj.BedroomNo = p.BedroomNo;
        propertyObj.RoomsNo = p.RoomsNo;
        propertyObj.ReceptionNo = p.ReceptionNo;
        propertyObj.Floor = p.Floor;
        propertyObj.Balacony = p.Balacony;
        propertyObj.Garage = p.Garage;
        propertyObj.Garden = p.Garden;
        propertyObj.Pool = p.Pool;
        propertyObj.Lift = p.Lift;
        propertyObj.Area = p.Area;
        propertyObj.PropertyType = p.PropertyType;
        propertyObj.Currency = p.Currency;
        propertyObj.Status = p.Status;
        propertyObj.CreatedBy = p.CreatedBy;
        propertyObj.CreatedDate = _publicdateTime;
        propertyObj.CreatedDate = _publicdateTime;

        _context.SaveChanges();
        return "Done";
      }
      else
        return "Error";


    }

    public string DeleteProperty(PropertyBackend property)
    {
      var propertyObj = _context.Properties.FirstOrDefault(item => item.Id == property.Id);
      if (propertyObj != null)
      {
        try
        {
          _context.Properties.Remove(propertyObj);
          _context.SaveChanges();
          return "Done";

        }
        catch (Exception)
        {
          return "Error";
          throw;
        }

      }
      else
        return "Error";
    }

    public int UpdatePropertyStatus(int propertyId, bool? imageStatus)
    {
      var obj = _context.Cities.FirstOrDefault(item => item.Id == propertyId);
      if (obj != null)
      {
        obj.CreatedDate = _publicdateTime;
        obj.Status = imageStatus;
        _context.SaveChanges();
        return 1;
      }
      else
        return 0;

    }

    public string GetPropertyTypeById(int? propertyTypeId)
    {
      var obj = _context.PropertyTypes.FirstOrDefault(p => p.Id == propertyTypeId);

      if (obj != null)
        return obj.Title;
      else
        return null;
    }
    public bool IsPropertyNameAvailable(PropertyBackend keyWords)
    {
      var returnVal = false;

      var categoryObj = _context.Cities.Where(x => x.Title.Contains(keyWords.Title.Trim()) ||
      x.TitleAr.Contains(keyWords.TitleAr.Trim())).ToList();

      if (categoryObj.Any())
        returnVal = true;

      return returnVal;
    }
    #endregion

    #endregion
  }
}
