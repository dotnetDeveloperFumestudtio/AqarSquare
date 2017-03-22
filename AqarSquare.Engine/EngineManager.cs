
using System.IO;
using AqarSquare.Engine.BusinessEntities;
using AqarSquare.Engine.BusinessEntities.BackEnd;
using AqarSquare.Engine.Entities;
using AqarSquares;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.ServiceModel.Web;
using System.Web.Security;
using PhotoSession = AqarSquare.Engine.BusinessEntities.BackEnd.PhotoSession;
using Reservation = AqarSquare.Engine.BusinessEntities.BackEnd.Reservation;

using System.Drawing;
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

    public string DeleteSelected(int[] itemsSelected)
    {
      var error = "";
      try
      {
        for (int i = 0; i < itemsSelected.Length; i++)
        {
          var obj = _context.Cities.Find(itemsSelected[i]);
          if (obj != null)
          {
            _context.Cities.Remove(obj);
          }
        }
        _context.SaveChanges();
        error = "Done";
      }
      catch (Exception)
      {
        error = "Error";
        throw;
      }
      return error;

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

    #region ContactForm

    public List<ContactFormBackend> GetAllContactForm()
    {
      var returnContact = new List<ContactFormBackend>();
      var contactFormObj = _context.ContactForms.ToList().OrderByDescending(x => x.Id);
      foreach (var c in contactFormObj)
      {
        bool isTenant = false || c.UserId != 0;
        returnContact.Add(new ContactFormBackend
        {
          Id = c.Id,
          FullName = c.FullName,
          CreatedDate = c.CreatedDate,
          Email = c.Email,
          Phone = c.Phone,
          Message = c.Message,
          UserId = c.UserId,
          ApprovedBy = c.ApprovedBy,
          ApprovedDate = c.ApprovedDate,
          IsTenant = isTenant
        });
      }
      return returnContact;
    }

    public string UpdatedContactForm(ContactFormBackend contactForm)
    {
      var contactFormObj = _context.ContactForms.FirstOrDefault(item => item.Id == contactForm.Id);
      if (contactFormObj != null)
      {
        if (contactFormObj.ApprovedBy == 0)
          contactFormObj.ApprovedBy = contactForm.ApprovedBy;
        else
          contactFormObj.ApprovedBy = 0;

        contactFormObj.ApprovedDate = _publicdateTime;

        _context.SaveChanges();
        return "Done";
      }
      else
        return "Error";


    }

    public string DeleteContactForm(ContactForm contactForm)
    {
      var contactFormObj = _context.ContactForms.FirstOrDefault(item => item.Id == contactForm.Id);
      if (contactFormObj != null)
      {
        try
        {
          _context.ContactForms.Remove(contactFormObj);
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


    #endregion

    #region PropertyType

    public List<PropertyTypeBackend> GetAllPropertyType()
    {
      var propertyTypeObj = _context.PropertyTypes.ToList().OrderByDescending(x => x.Id);
      return propertyTypeObj.Select(propertyTypeBackend => new PropertyTypeBackend
      {
        Id = propertyTypeBackend.Id,
        CreatedBy = propertyTypeBackend.CreatedBy,
        CreatedByUserName = GetUserNameById(propertyTypeBackend.CreatedBy),
        CreatedDate = propertyTypeBackend.CreatedDate,
        Status = propertyTypeBackend.Status,
        Title = propertyTypeBackend.Title,
        TitleAr = propertyTypeBackend.TitleAr
      }).ToList();
    }

    public List<PropertyTypeBackend> GetAllPropertyTypeByStatus()
    {
      var propertyTypeObj = _context.PropertyTypes.Where(x => x.Status == true).ToList().OrderByDescending(x => x.Id);
      return propertyTypeObj.Select(propertyTypeBackend => new PropertyTypeBackend
      {
        Id = propertyTypeBackend.Id,
        CreatedBy = propertyTypeBackend.CreatedBy,
        CreatedByUserName = GetUserNameById(propertyTypeBackend.CreatedBy),
        CreatedDate = propertyTypeBackend.CreatedDate,
        Status = propertyTypeBackend.Status,
        Title = propertyTypeBackend.Title,
        TitleAr = propertyTypeBackend.TitleAr
      }).ToList();
    }

    public string CreatePropertyType(PropertyTypeBackend propertyType)
    {
      if (IsPropertyTypeNameAvailable(propertyType))
        return "Exist";

      var propertyTypeObj = new PropertyType();
      try
      {
        propertyTypeObj.Title = propertyType.Title;
        propertyTypeObj.TitleAr = propertyType.TitleAr;
        propertyTypeObj.Status = propertyType.Status;
        propertyTypeObj.CreatedBy = propertyType.CreatedBy;
        propertyTypeObj.CreatedDate = _publicdateTime;
        _context.PropertyTypes.Add(propertyTypeObj);
        _context.SaveChanges();

        return "Done";
      }
      catch (Exception)
      {
        return "Error";
        throw;
      }

    }

    public string UpdatedPropertyType(PropertyTypeBackend propertyType)
    {
      var propertyTypeObj = _context.PropertyTypes.FirstOrDefault(item => item.Id == propertyType.Id);
      if (propertyTypeObj != null)
      {
        propertyTypeObj.Title = propertyType.Title;
        propertyTypeObj.TitleAr = propertyType.TitleAr;
        propertyTypeObj.Status = propertyType.Status;
        propertyTypeObj.CreatedBy = propertyType.CreatedBy;
        propertyTypeObj.CreatedDate = _publicdateTime;

        _context.SaveChanges();
        return "Done";
      }
      else
        return "Error";


    }

    public string DeletePropertyType(PropertyTypeBackend propertyType)
    {
      var propertyTypeObj = _context.PropertyTypes.FirstOrDefault(item => item.Id == propertyType.Id);
      if (propertyTypeObj != null)
      {
        try
        {
          _context.PropertyTypes.Remove(propertyTypeObj);
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

    public int UpdatePropertyTypeStatus(int propertyTypeId, bool? imageStatus)
    {
      var obj = _context.PropertyTypes.FirstOrDefault(item => item.Id == propertyTypeId);
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

    public bool IsPropertyTypeNameAvailable(PropertyTypeBackend keyWords)
    {
      var returnVal = false;

      var categoryObj = _context.PropertyTypes.Where(x => x.Title.Contains(keyWords.Title.Trim()) ||
      x.TitleAr.Contains(keyWords.TitleAr.Trim())).ToList();

      if (categoryObj.Any())
        returnVal = true;

      return returnVal;
    }

    #endregion

    #region ContractType

    public List<ContractTypeBackend> GetAllContractType()
    {
      var contractTypeObj = _context.ContractTypes.ToList().OrderByDescending(x => x.Id);
      return contractTypeObj.Select(c => new ContractTypeBackend
      {
        Id = c.Id,
        CreatedBy = c.CreatedBy,
        CreatedByUserName = GetUserNameById(c.CreatedBy),
        CreatedDate = c.CreatedDate,
        Status = c.Status,
        Title = c.Title,
        TitleAr = c.TitleAr
      }).ToList();
    }

    public List<ContractTypeBackend> GetAllContractTypeByStatus()
    {
      var contractTypeObj = _context.ContractTypes.Where(x => x.Status == true).ToList().OrderByDescending(x => x.Id);
      return contractTypeObj.Select(c => new ContractTypeBackend
      {
        Id = c.Id,
        CreatedBy = c.CreatedBy,
        CreatedByUserName = GetUserNameById(c.CreatedBy),
        CreatedDate = c.CreatedDate,
        Status = c.Status,
        Title = c.Title,
        TitleAr = c.TitleAr
      }).ToList();
    }

    public string CreateContractType(ContractTypeBackend contractType)
    {
      if (IsContractTypeNameAvailable(contractType))
        return "Exist";

      var contractTypeObj = new ContractType();
      try
      {
        contractTypeObj.Title = contractType.Title;
        contractTypeObj.TitleAr = contractType.TitleAr;
        contractTypeObj.Status = contractType.Status;
        contractTypeObj.CreatedBy = contractType.CreatedBy;
        contractTypeObj.CreatedDate = _publicdateTime;
        _context.ContractTypes.Add(contractTypeObj);
        _context.SaveChanges();

        return "Done";
      }
      catch (Exception)
      {
        return "Error";
        throw;
      }

    }

    public string UpdatedContractType(ContractTypeBackend contractType)
    {
      var contractTypeObj = _context.ContractTypes.FirstOrDefault(item => item.Id == contractType.Id);
      if (contractTypeObj != null)
      {
        contractTypeObj.Title = contractType.Title;
        contractTypeObj.TitleAr = contractType.TitleAr;
        contractTypeObj.Status = contractType.Status;
        contractTypeObj.CreatedBy = contractType.CreatedBy;
        contractTypeObj.CreatedDate = _publicdateTime;

        _context.SaveChanges();
        return "Done";
      }
      else
        return "Error";


    }

    public string DeleteContractType(ContractTypeBackend contractType)
    {
      var contractTypeObj = _context.ContractTypes.FirstOrDefault(item => item.Id == contractType.Id);
      if (contractTypeObj != null)
      {
        try
        {
          _context.ContractTypes.Remove(contractTypeObj);
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

    public int UpdateContractTypeStatus(int contractTypeId, bool? imageStatus)
    {
      var obj = _context.ContractTypes.FirstOrDefault(item => item.Id == contractTypeId);
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

    public bool IsContractTypeNameAvailable(ContractTypeBackend keyWords)
    {
      var returnVal = false;

      var categoryObj = _context.ContractTypes.Where(x => x.Title.Contains(keyWords.Title.Trim()) ||
      x.TitleAr.Contains(keyWords.TitleAr.Trim())).ToList();

      if (categoryObj.Any())
        returnVal = true;

      return returnVal;
    }

    #endregion

    #region Property

    public int GetCountPoropertyByUserId(int userId)
    {
      return _context.Properties.Count(x => x.UserId == userId);
    }


    public List<CurrencyBackend> GetAllCurrency()
    {
      var obj = _context.TbCurrencies.ToList().OrderByDescending(x => x.Id);
      return obj.Select(p => new CurrencyBackend
      {
        Id = p.Id,
        CurrencyKey = p.CurrencyKey,
        Currency = p.Currency,
        CreatedByUserName = GetUserNameById(p.CreatedBy)
      }).ToList();
    }

    public List<PropertyBackend> GetAllUserProperty()
    {
      var userType = Convert.ToInt32(UserTypes.Tenant);
      var propertyList = new List<PropertyBackend>();
      var usersObj = _context.SystemUsers.Where(x => x.UserType == userType).ToList().OrderByDescending(x => x.Id);
      foreach (var systemUser in usersObj)
      {
        var propertyObj = _context.Properties.Where(x => x.UserId == systemUser.Id).ToList().OrderByDescending(x => x.Id);
        foreach (var p in propertyObj)
        {
          propertyList.Add(new PropertyBackend
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
            AirCondtion = p.AirCondtion,
            Area = p.Area,
            PropertyTypeName = GetPropertyTypeById(p.PropertyType),
            Currency = p.Currency,
            Approved = p.Approved,
            CreatedBy = p.CreatedBy,
            CreatedByUserName = GetUserNameById(p.CreatedBy),
            CreatedDate = p.CreatedDate,
            ApprovedBy = p.ApprovedBy,
            ApprovedByUserName = GetUserNameById(p.ApprovedBy),
            ApprovedDate = p.ApprovedDate,
            UserId = p.UserId,
            ContractType = p.ContractType

          });
        }

      }
      return propertyList;
    }

    public List<PropertyBackend> GetAllAdminProperty()
    {
      var userType = Convert.ToInt32(UserTypes.Admin);
      var propertyList = new List<PropertyBackend>();
      var usersObj = _context.SystemUsers.Where(x => x.UserType == userType).ToList().OrderByDescending(x => x.Id);
      foreach (var systemUser in usersObj)
      {
        var propertyObj = _context.Properties.Where(x => x.UserId == systemUser.Id).ToList().OrderByDescending(x => x.Id);
        foreach (var p in propertyObj)
        {
          propertyList.Add(new PropertyBackend
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
            AirCondtion = p.AirCondtion,
            PropertyTypeName = GetPropertyTypeById(p.PropertyType),
            Currency = p.Currency,
            Approved = p.Approved,
            CreatedBy = p.CreatedBy,
            CreatedByUserName = GetUserNameById(p.CreatedBy),
            CreatedDate = p.CreatedDate,
            ApprovedByUserName = GetUserNameById(p.ApprovedBy),
            ApprovedBy = p.ApprovedBy,
            ApprovedDate = p.ApprovedDate,
            UserId = p.UserId,
            ContractType = p.ContractType

          });
        }

      }
      return propertyList;
    }

    public static int RandNumber(int low, int high)
    {
      var rndNum = new Random(int.Parse(Guid.NewGuid().ToString().Substring(0, 8), System.Globalization.NumberStyles.HexNumber));
      var rnd = rndNum.Next(low, high);
      return rnd;
    }

    public string CreateProperty(PropertyBackend p)
    {
      //if (IsPropertyNameAvailable(property))
      //  return "Exist";

      var propertyObj = new Property();
      try
      {
        //Random rnd = new Random();
        //int Value = rnd.Next(1, 100000);
        propertyObj.PropertyId = RandNumber(10, 100000).ToString();
        propertyObj.Title = p.Title;
        propertyObj.TitleAr = p.TitleAr;
        propertyObj.Description = p.Description;
        propertyObj.DescriptionAr = p.DescriptionAr;
        propertyObj.Address = p.Address;
        propertyObj.AddressAr = p.AddressAr;
        propertyObj.Late = p.Late;
        propertyObj.Long = p.Long;
        propertyObj.Price = p.Price;
        propertyObj.BathroomNo = p.BathroomNo;
        propertyObj.BedroomNo = p.BedroomNo;
        propertyObj.RoomsNo = p.RoomsNo;
        propertyObj.ReceptionNo = p.ReceptionNo;
        propertyObj.Floor = p.Floor;
        propertyObj.Balacony = (p.Balacony == null) ? false : true;
        propertyObj.Garage = (p.Garage == null) ? false : true;
        propertyObj.Garden = (p.Garden == null) ? false : true;
        propertyObj.Pool = (p.Pool == null) ? false : true;
        propertyObj.Lift = (p.Lift == null) ? false : true;
        propertyObj.AirCondtion = (p.AirCondtion == null) ? false : true;
        propertyObj.Area = p.Area;
        propertyObj.PropertyType = p.PropertyType;
        propertyObj.ContractType = p.ContractType;
        propertyObj.Currency = p.Currency;
        propertyObj.Approved = true;
        propertyObj.CreatedBy = p.CreatedBy;
        propertyObj.ApprovedBy = 0;
        propertyObj.CreatedDate = _publicdateTime;
        propertyObj.UserId = p.UserId;
        propertyObj.Space = p.Space;
        propertyObj.IsDelete = false;
        propertyObj.IsPublished = true;
        propertyObj.IsAqarContract = Convert.ToInt32(PropertyContractStatus.Pending);
        propertyObj.IsNotAqarContract = Convert.ToInt32(PropertyContractStatus.Pending);
        propertyObj.UserInCharge = p.UserInCharge;
        _context.Properties.Add(propertyObj);
        _context.SaveChanges();

        return propertyObj.Id.ToString();
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
        propertyObj.AirCondtion = p.AirCondtion;
        propertyObj.Area = p.Area;
        propertyObj.PropertyType = p.PropertyType;
        propertyObj.Currency = p.Currency;
        propertyObj.Approved = p.Approved;
        propertyObj.Space = p.Space;
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

    //public int UpdatePropertyStatus(int propertyId, bool? imageStatus)
    public int UpdatePropertyStatus(PropertyBackend property)
    {
      var obj = _context.Properties.FirstOrDefault(item => item.Id == property.Id);
      if (obj != null)
      {
        obj.CreatedDate = _publicdateTime;
        obj.ApprovedDate = _publicdateTime;
        obj.Approved = property.Approved;
        if (obj.Approved == true)
          obj.ApprovedBy = property.ApprovedBy;
        else
          obj.ApprovedBy = 0;

        _context.SaveChanges();
        return 1;
      }
      else
        return 0;

    }
    public int CheckAsMainImage(ImageBalacony image, int imageCategory)
    {
      var retunValue = 0;
      ClearImageIsMain(image.PropertyId);

      if (imageCategory == Convert.ToInt32(ImageCategory.Balacony))
      {
        var obj = _context.ImageBalaconies.FirstOrDefault(item => item.Id == image.Id);
        if (obj != null)
        {
          obj.CreatedDate = _publicdateTime;
          obj.IsMainImage = true;
          _context.SaveChanges();
          retunValue = 1;
        }
        else
          retunValue = 0;
      }
      if (imageCategory == Convert.ToInt32(ImageCategory.Bathroom))
      {
        var obj = _context.ImageBathrooms.FirstOrDefault(item => item.Id == image.Id);
        if (obj != null)
        {
          obj.CreatedDate = _publicdateTime;
          obj.IsMainImage = true;
          _context.SaveChanges();
          retunValue = 1;
        }
        else
          retunValue = 0;
      }
      if (imageCategory == Convert.ToInt32(ImageCategory.Reception))
      {
        var obj = _context.ImageReceptions.FirstOrDefault(item => item.Id == image.Id);
        if (obj != null)
        {
          obj.CreatedDate = _publicdateTime;
          obj.IsMainImage = true;
          _context.SaveChanges();
          retunValue = 1;
        }
        else
          retunValue = 0;
      }
      if (imageCategory == Convert.ToInt32(ImageCategory.Garden))
      {
        var obj = _context.ImageGardens.FirstOrDefault(item => item.Id == image.Id);
        if (obj != null)
        {
          obj.CreatedDate = _publicdateTime;
          obj.IsMainImage = true;
          _context.SaveChanges();
          retunValue = 1;
        }
        else
          retunValue = 0;
      }
      if (imageCategory == Convert.ToInt32(ImageCategory.Pool))
      {
        var obj = _context.ImagePools.FirstOrDefault(item => item.Id == image.Id);
        if (obj != null)
        {
          obj.CreatedDate = _publicdateTime;
          obj.IsMainImage = true;
          _context.SaveChanges();
          retunValue = 1;
        }
        else
          retunValue = 0;
      }
      if (imageCategory == Convert.ToInt32(ImageCategory.Bedroom))
      {
        var obj = _context.ImageBedrooms.FirstOrDefault(item => item.Id == image.Id);
        if (obj != null)
        {
          obj.CreatedDate = _publicdateTime;
          obj.IsMainImage = true;
          _context.SaveChanges();
          retunValue = 1;
        }
        else
          retunValue = 0;
      }
      return retunValue;
    }

    public void ClearImageIsMain(int? propertyId)
    {
      var obj1 = _context.ImageBalaconies.FirstOrDefault(item => item.PropertyId == propertyId);
      var obj2 = _context.ImageBathrooms.FirstOrDefault(item => item.PropertyId == propertyId);
      var obj3 = _context.ImageReceptions.FirstOrDefault(item => item.PropertyId == propertyId);
      var obj4 = _context.ImageGardens.FirstOrDefault(item => item.PropertyId == propertyId);
      var obj5 = _context.ImagePools.FirstOrDefault(item => item.PropertyId == propertyId);
      var obj6 = _context.ImageBedrooms.FirstOrDefault(item => item.PropertyId == propertyId);

      if (obj1 != null)
      {
        obj1.CreatedDate = _publicdateTime;
        obj1.IsMainImage = false;
        obj1.CreatedDate = _publicdateTime;
      }
      if (obj2 != null)
      {
        obj2.IsMainImage = false;
        obj2.CreatedDate = _publicdateTime;
        obj2.IsMainImage = false;
      }
      if (obj3 != null)
      {
        obj3.CreatedDate = _publicdateTime;
        obj3.IsMainImage = false;
        obj3.CreatedDate = _publicdateTime;
      }
      if (obj4 != null)
      {
        obj4.IsMainImage = false;
        obj4.CreatedDate = _publicdateTime;
        obj4.IsMainImage = false;
      }
      if (obj5 != null)
      {
        obj5.IsMainImage = false;
        obj5.CreatedDate = _publicdateTime;
        obj5.IsMainImage = false;
      }
      if (obj6 != null)
      {
        obj6.IsMainImage = false;
        obj6.CreatedDate = _publicdateTime;
        obj6.IsMainImage = false;
      }
      _context.SaveChanges();

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

    public PropertyInfo GetPropertyInfo(PropertyBackend property)
    {
      var result = new PropertyInfo();

      var viewObj = _context.PropertyVeiweds.Count(item => item.PropertyId == property.Id);
      var userInfo = GetSystemUserById(property.UserId);
      result.ViewCount = viewObj;
      result.Email = userInfo.Email;
      result.Status = property.Approved;
      result.CreatedDate = property.CreatedDate;
      result.CreatedByUserName = GetUserNameById(property.UserId);

      return result;
    }

    #region Balacony Images
    public List<ImageBalacony> GetAllImageBalacony(int propertyId)
    {
      return _context.ImageBalaconies.Where(x => x.PropertyId == propertyId).ToList();
    }

    public List<ImageBalacony> GetAllImageBalaconies(ImageBalacony image)
    {
      var getList = _context.ImageBalaconies.Where(x => x.PropertyId == image.PropertyId).ToList();
      return getList;
    }

    public List<ImageBalacony> InsertImageBalaconies(ImageBalacony image)
    {
      var imageObj = new ImageBalacony();
      imageObj.Image = image.Image;
      imageObj.PropertyId = image.PropertyId;
      imageObj.Status = true;
      imageObj.IsMainImage = false;
      imageObj.CreatedBy = image.CreatedBy;
      imageObj.CreatedDate = _publicdateTime;

      Image image1 = Image.FromFile(@"D:\M-Saber\Projects\Aqar Squaers\Project\AqarSquare\BackEnd\Upload\Balacony\" + image.Image);
      Image thumb = image1.GetThumbnailImage(120, 120, () => false, IntPtr.Zero);
      thumb.Save(Path.ChangeExtension(@"D:\M-Saber\Projects\Aqar Squaers\Project\AqarSquare\BackEnd\Upload\Balacony\Thumb\" + image.Image + "thumb", "jpg"));
     
      imageObj.Thumb = thumb.ToString();
      _context.ImageBalaconies.Add(imageObj);
      _context.SaveChanges();

      return GetAllImageBalaconies(image);
    }

    public string DeleteImageBalaconies(ImageBalacony image)
    {
      var obj = _context.ImageBalaconies.FirstOrDefault(item => item.Id == image.Id);
      if (obj != null)
      {
        try
        {
          _context.ImageBalaconies.Remove(obj);
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

    #endregion

    #region Bathroom Images
    public List<ImageBathroom> GetAllImageBathroom(int propertyId)
    {
      return _context.ImageBathrooms.Where(x => x.PropertyId == propertyId).ToList();
    }

    public List<ImageBathroom> GetAllImageBathroom(ImageBathroom image)
    {
      return _context.ImageBathrooms.Where(x => x.PropertyId == image.PropertyId).ToList();
    }

    public List<ImageBathroom> InsertImageBathroom(ImageBathroom image)
    {
      var imageObj = new ImageBathroom();
      imageObj.Image = image.Image;
      imageObj.PropertyId = image.PropertyId;
      imageObj.Status = true;
      imageObj.IsMainImage = false;
      imageObj.CreatedBy = image.CreatedBy;
      imageObj.CreatedDate = _publicdateTime;

      _context.ImageBathrooms.Add(imageObj);
      _context.SaveChanges();

      return GetAllImageBathroom(image);
    }

    public string DeleteImageBathroom(ImageBathroom image)
    {
      var obj = _context.ImageBathrooms.FirstOrDefault(item => item.Id == image.Id);
      if (obj != null)
      {
        try
        {
          _context.ImageBathrooms.Remove(obj);
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

    #endregion

    #region  Reception Images

    public List<ImageReception> GetAllImageReception(int propertyId)
    {
      return _context.ImageReceptions.Where(x => x.PropertyId == propertyId).ToList();
    }

    public List<ImageReception> GetAllImageReception(ImageReception image)
    {
      return _context.ImageReceptions.Where(x => x.PropertyId == image.PropertyId).ToList();
    }

    public List<ImageReception> InsertImageReception(ImageReception image)
    {
      var imageObj = new ImageReception();
      imageObj.Image = image.Image;
      imageObj.PropertyId = image.PropertyId;
      imageObj.Status = true;
      imageObj.IsMainImage = false;
      imageObj.CreatedBy = image.CreatedBy;
      imageObj.CreatedDate = _publicdateTime;

      _context.ImageReceptions.Add(imageObj);
      _context.SaveChanges();

      return GetAllImageReception(image);
    }

    public string DeleteImageReception(ImageReception image)
    {
      var obj = _context.ImageReceptions.FirstOrDefault(item => item.Id == image.Id);
      if (obj != null)
      {
        try
        {
          _context.ImageReceptions.Remove(obj);
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

    #endregion

    #region Garden Images

    public List<ImageGarden> GetAllImageGarden(ImageGarden image)
    {
      return _context.ImageGardens.Where(x => x.PropertyId == image.PropertyId).ToList();
    }
    public List<ImageGarden> GetAllImageGarden(int propertyId)
    {
      return _context.ImageGardens.Where(x => x.PropertyId == propertyId).ToList();
    }
    public List<ImageGarden> InsertImageGarden(ImageGarden image)
    {
      var imageObj = new ImageGarden();
      imageObj.Image = image.Image;
      imageObj.PropertyId = image.PropertyId;
      imageObj.Status = true;
      imageObj.IsMainImage = false;
      imageObj.CreatedBy = image.CreatedBy;
      imageObj.CreatedDate = _publicdateTime;

      _context.ImageGardens.Add(imageObj);
      _context.SaveChanges();

      return GetAllImageGarden(image);
    }

    public string DeleteImageGarden(ImageGarden image)
    {
      var obj = _context.ImageGardens.FirstOrDefault(item => item.Id == image.Id);
      if (obj != null)
      {
        try
        {
          _context.ImageGardens.Remove(obj);
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
    public string DeleteSelectedImageGarden(int[] itemsSelected)
    {
      var error = "";
      try
      {
        for (int i = 0; i < itemsSelected.Length; i++)
        {
          var obj = _context.ImageGardens.Find(itemsSelected[i]);
          if (obj != null)
          {
            _context.ImageGardens.Remove(obj);
          }
        }
        _context.SaveChanges();
        error = "Done";
      }
      catch (Exception)
      {
        error = "Error";
        throw;
      }
      return error;

    }

    #endregion

    #region Pool Images
    public List<ImagePool> GetAllImagePool(int propertyId)
    {
      return _context.ImagePools.Where(x => x.PropertyId == propertyId).ToList();
    }

    public List<ImagePool> GetAllImagePool(ImagePool image)
    {
      return _context.ImagePools.Where(x => x.PropertyId == image.PropertyId).ToList();
    }

    public List<ImagePool> InsertImagePool(ImagePool image)
    {
      var imageObj = new ImagePool();
      imageObj.Image = image.Image;
      imageObj.PropertyId = image.PropertyId;
      imageObj.Status = true;
      imageObj.IsMainImage = false;
      imageObj.CreatedBy = image.CreatedBy;
      imageObj.CreatedDate = _publicdateTime;

      _context.ImagePools.Add(imageObj);
      _context.SaveChanges();

      return GetAllImagePool(image);
    }

    public string DeleteImagePool(ImagePool image)
    {
      var obj = _context.ImagePools.FirstOrDefault(item => item.Id == image.Id);
      if (obj != null)
      {
        try
        {
          _context.ImagePools.Remove(obj);
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

    #endregion

    #region Bedroom Images

    public List<ImageBedroom> GetAllImageBedroom(int propertyId)
    {
      return _context.ImageBedrooms.Where(x => x.PropertyId == propertyId).ToList();
    }

    public List<ImageBedroom> GetAllImageBedroom(ImageBedroom image)
    {
      return _context.ImageBedrooms.Where(x => x.PropertyId == image.PropertyId).ToList();
    }

    public List<ImageBedroom> InsertImageBedroom(ImageBedroom image)
    {
      var imageObj = new ImageBedroom();
      imageObj.Image = image.Image;
      imageObj.PropertyId = image.PropertyId;
      imageObj.Status = true;
      imageObj.IsMainImage = false;
      imageObj.CreatedBy = image.CreatedBy;
      imageObj.CreatedDate = _publicdateTime;

      _context.ImageBedrooms.Add(imageObj);
      _context.SaveChanges();

      return GetAllImageBedroom(image);
    }

    public string DeleteImageBedroom(ImageBedroom image)
    {
      var obj = _context.ImageBedrooms.FirstOrDefault(item => item.Id == image.Id);
      if (obj != null)
      {
        try
        {
          _context.ImageBedrooms.Remove(obj);
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

    #endregion

    public int CountUnApprovedProperty()
    {
      var count = 0;
      var userType = Convert.ToInt32(UserTypes.Tenant);
      var usersObj = _context.SystemUsers.Where(x => x.UserType == userType).ToList().OrderByDescending(x => x.Id);
      foreach (var systemUser in usersObj)
      {
        var viewObj = _context.Properties.Count(item => item.ApprovedBy == 0
                                                                 && item.UserId == systemUser.Id);
        count = viewObj;
      }
      //return _context.Properties.Count(x => x.ApprovedBy == 0);
      return count;

    }

    public PropertyBackend GetPropertyById(string propertyId)
    {
      var result = new PropertyBackend();

      var viewObj = _context.Properties.FirstOrDefault(item => item.PropertyId == propertyId);
      if (viewObj != null)
      {
        result.Id = viewObj.Id;
        result.PropertyId = viewObj.PropertyId;
        result.Title = viewObj.Title;
        result.TitleAr = viewObj.TitleAr;
        result.Description = viewObj.Description;
        result.DescriptionAr = viewObj.DescriptionAr;
        result.Address = viewObj.Address;
        result.AddressAr = viewObj.AddressAr;
        result.Late = viewObj.Late;
        result.Long = viewObj.Long;
        result.Price = viewObj.Price;
        result.BathroomNo = viewObj.BathroomNo;
        result.BedroomNo = viewObj.BedroomNo;
        result.RoomsNo = viewObj.RoomsNo;
        result.ReceptionNo = viewObj.ReceptionNo;
        result.Floor = viewObj.Floor;
        result.Balacony = viewObj.Balacony;
        result.Garage = viewObj.Garage;
        result.Garden = viewObj.Garden;
        result.Pool = viewObj.Pool;
        result.Lift = viewObj.Lift;
        result.Area = viewObj.Area;
        result.PropertyTypeName = GetPropertyTypeById(viewObj.PropertyType);
        result.PropertyType = viewObj.PropertyType;
        result.Currency = viewObj.Currency;
        result.Approved = viewObj.Approved;
        result.CreatedBy = viewObj.CreatedBy;
        result.CreatedByUserName = GetUserNameById(viewObj.CreatedBy);
        result.CreatedDate = viewObj.CreatedDate;
        result.ApprovedBy = viewObj.ApprovedBy;
        result.ApprovedByUserName = GetUserNameById(viewObj.ApprovedBy);
        result.ApprovedDate = viewObj.ApprovedDate;
        result.UserId = viewObj.UserId;
        result.ContractType = viewObj.ContractType;
        result.ListImageBedroom = GetAllImageBedroom(viewObj.Id);
        result.ListImageBalacony = GetAllImageBalacony(viewObj.Id);
        result.ListImagePool = GetAllImagePool(viewObj.Id);
        result.ListImageReception = GetAllImageReception(viewObj.Id);
        result.ListImageGarden = GetAllImageGarden(viewObj.Id);
        result.ListImageBathroom = GetAllImageBathroom(viewObj.Id);
      }

      return result;
    }

    #endregion

    #region Reservation

    public List<Reservation> GetAllReservation()
    {
      var returnReservation = new List<Reservation>();
      var contactFormObj = _context.Reservations.ToList().OrderByDescending(x => x.Id);
      foreach (var c in contactFormObj)
      {
        var userInfo = GetSystemUserById(c.UserId);
        //var propertyInfo = GetPropertyById(c.PropertyId.ToString());
        returnReservation.Add(new Reservation
        {
          Id = c.Id,
          FullName = userInfo.FirstName + " " + userInfo.LastName,
          CreatedDate = c.CreatedDate,
          Email = userInfo.Email,
          Phone = userInfo.Phone,
          PropertyId = c.PropertyId.ToString(),
          ApprovedBy = c.ApprovedBy,
          ApprovedDate = c.ApprovedDate
        });
      }
      return returnReservation;
    }

    public string UpdatedReservation(Reservation reservation)
    {
      var reservationObj = _context.Reservations.FirstOrDefault(item => item.Id == reservation.Id);
      if (reservationObj != null)
      {
        if (reservationObj.ApprovedBy == 0)
          reservationObj.ApprovedBy = reservation.ApprovedBy;
        else
          reservationObj.ApprovedBy = 0;

        reservationObj.ApprovedDate = _publicdateTime;

        _context.SaveChanges();
        return "Done";
      }
      else
        return "Error";


    }



    #endregion

    #region PhotoSession

    public List<PhotoSession> GetAllPhotoSession()
    {
      var returnPhotoSession = new List<PhotoSession>();
      var photoSessionObj = _context.PhotoSessions.ToList().OrderByDescending(x => x.Id);
      foreach (var c in photoSessionObj)
      {
        var userInfo = GetSystemUserById(c.UserId);
        //var propertyInfo = GetPropertyById(c.PropertyId.ToString());
        returnPhotoSession.Add(new PhotoSession
        {
          Id = c.Id,
          FullName = userInfo.FirstName + " " + userInfo.LastName,
          CreatedDate = c.CreatedDate,
          Email = userInfo.Email,
          Phone = userInfo.Phone,
          PropertyId = c.PropertyId.ToString(),
          ApprovedBy = c.ApprovedBy,
          ApprovedDate = c.ApprovedDate
        });
      }
      return returnPhotoSession;
    }

    public string UpdatedPhotoSession(PhotoSession photoSession)
    {
      var photoSessionObj = _context.PhotoSessions.FirstOrDefault(item => item.Id == photoSession.Id);
      if (photoSessionObj != null)
      {
        if (photoSessionObj.ApprovedBy == 0)
          photoSessionObj.ApprovedBy = photoSession.ApprovedBy;
        else
          photoSessionObj.ApprovedBy = 0;

        photoSessionObj.ApprovedDate = _publicdateTime;

        _context.SaveChanges();
        return "Done";
      }
      else
        return "Error";


    }



    #endregion

    #region Admin User

    protected int GetUserRoleId(int userId)
    {
      var roleId = 0;
      var userRole = _context.Users_Role.FirstOrDefault(x => x.UserId == userId);
      if (userRole != null)
        if (userRole.RoleId != null)
          roleId = (int)userRole.RoleId;

      return roleId;
    }

    protected string GetUserRole(int userId)
    {
      var roleName = "";
      var userRole = _context.Users_Role.FirstOrDefault(x => x.UserId == userId);
      if (userRole != null)
      {
        var roleId = userRole.RoleId;
        var firstOrDefault = _context.Roles.FirstOrDefault(x => x.Id == roleId);
        if (firstOrDefault != null)
        {
          var role1 = firstOrDefault.Role1;
          if (role1 != null)
            roleName = role1;
        }
      }

      return roleName;
    }

    public SystemUserBackend Login(SystemUserBackend user)
    {
      var returnVal = new SystemUserBackend();
      var userType = Convert.ToInt32(UserTypes.Admin);
      var checkUser = _context.SystemUsers.FirstOrDefault(x => x.Email == user.Email.Trim()
                                                               && x.Password == user.Password.Trim()
                                                               && x.UserType == userType);
      if (checkUser != null)
      {
        var userRole = GetUserRole(checkUser.Id);
        returnVal.FullName = GetUserNameById(checkUser.Id);
        returnVal.Id = checkUser.Id;
        returnVal.Role = userRole;

      }

      return returnVal;
    }

    public string ChangePassword(string userId, string oldPassword, string newPassword)
    {
      var result = "";
      int userid = Convert.ToInt32(userId);

      var securityUser = _context.SystemUsers.FirstOrDefault(item => item.Id == userid);

      if (securityUser != null)
      {
        if (securityUser.Password == oldPassword)
        {
          securityUser.Password = newPassword;
          _context.SaveChanges();
          result = "Changed";
        }
        else
          result = "WrongPassword";
      }
      else
      {
        result = "WrongUser";

      }
      return result;
    }

    public string AdminForgetPassword(string userEmail)
    {
      var result = "";
      const int returnId = 1;
      try
      {
        var user = _context.SystemUsers.FirstOrDefault(item => item.Email == userEmail);
        if (user != null)
        {
          string password = Membership.GeneratePassword(7, 1);
          user.Password = password;
          _context.SaveChanges();
          var subject = "Forget Password";
          var body = string.Format(@"Dear {0},
          your new Password: {1}
           
         Regards, 
         The Concierge Team
         ",
            user.FirstName + "" + user.LastName, password);

          //   returnId = EmailHelper.CheckSendEmail(user.Email, subject, body);

        }
        if (returnId != 0)
        {
          result = "MAIL_SENT";
        }
        else
        {
          result = "NOT_VALID";

        }
      }
      catch (Exception e)
      {
        result = "NOT_VALID";
      }
      return result;

    }

    public bool IsUserEmailAvailable(SystemUserBackend user)
    {
      var returnVal = false;

      var userObj = _context.SystemUsers.Where(x => x.Email == user.Email.Trim()).ToList();

      if (userObj.Any())
        returnVal = true;

      return returnVal;
    }

    public string GetUserNameById(int? id)
    {
      SystemUser _user = _context.SystemUsers.FirstOrDefault(user => user.Id == id);

      if (_user != null)
        return _user.FirstName + " " + _user.LastName;
      else
        return null;
    }

    public SystemUserBackend GetSystemUserById(int? userId)
    {
      var result = new SystemUserBackend();
      var user = _context.SystemUsers.FirstOrDefault(item => item.Id == userId);
      var userContact = _context.UserContacts.FirstOrDefault(item => item.UserId == userId);
      if (user != null)
      {
        result.FirstName = user.FirstName;
        result.LastName = user.LastName;
        result.Email = user.Email;
        if (userContact != null)
        {
          result.Phone = userContact.Phone;
          result.Phone2 = userContact.Phone2;
          result.WhatsApp = userContact.WhatsApp;
          result.Viber = userContact.Viber;
        }
        result.Status = user.Status;
        result.Role = GetUserRole(user.Id);
        result.RoleId = GetUserRoleId(user.Id);
        result.CreatedDate = user.CreatedDate;
      }
      return result;
    }

    public List<SystemUserBackend> GetAllAdminUsers()
    {
      var usertype = Convert.ToInt32(UserTypes.Admin);
      var returnList = new List<SystemUserBackend>();
      var systemUser = _context.SystemUsers.Where(x => x.UserType == usertype).ToList();
      foreach (var user in systemUser)
      {
        var propertyCount = GetCountPoropertyByUserId(user.Id);
        var userData = GetSystemUserById(user.Id);
        returnList.Add(new SystemUserBackend
        {
          Id = user.Id,
          FullName = GetUserNameById(user.Id),
          FirstName = userData.FirstName,
          LastName = userData.LastName,
          Email = userData.Email,
          WhatsApp = userData.WhatsApp,
          Viber = userData.Viber,
          Status = userData.Status,
          Phone = userData.Phone,
          Phone2 = userData.Phone2,
          CreatedDate = userData.CreatedDate,
          UserPropertyCount = propertyCount,
          Role = userData.Role,
          RoleId = userData.RoleId
        });
      }
      return returnList;
      //return systemUser.Select(systemUserBackend => new SystemUserBackend
      //{
      //  Email = systemUserBackend.Email,
      //  FirstName = systemUserBackend.FirstName,
      //  Id = systemUserBackend.Id,
      //  Status = systemUserBackend.Status,

      //}).ToList();
    }

    public string CreateAdminUser(SystemUserBackend user)
    {
      if (IsUserEmailAvailable(user))
        return "Exist";
      var userType = Convert.ToInt32(UserTypes.Admin);
      var userObj = new SystemUser();
      try
      {
        userObj.FirstName = user.FirstName;
        userObj.LastName = user.LastName;
        userObj.Email = user.Email;
        userObj.Password = "123";
        userObj.Status = user.Status;
        userObj.UserType = userType;
        userObj.CreatedDate = _publicdateTime;


        _context.SystemUsers.Add(userObj);
        _context.SaveChanges();

        var userContactObj = new UserContact();
        userContactObj.Phone = user.Phone;
        userContactObj.Phone2 = user.Phone2;
        userContactObj.WhatsApp = user.WhatsApp;
        userContactObj.Viber = user.Viber;
        userContactObj.UserId = userObj.Id;
        userContactObj.CreatedDate = _publicdateTime;

        _context.UserContacts.Add(userContactObj);
        _context.SaveChanges();

        var userRole = new Users_Role();
        userRole.RoleId = user.RoleId;
        userRole.UserId = userObj.Id;

        _context.Users_Role.Add(userRole);
        _context.SaveChanges();
        return "Done";
      }
      catch (Exception)
      {
        return "Error";
        throw;
      }

    }

    public string UpdateAdminUser(SystemUserBackend user)
    {
      var userObj = _context.SystemUsers.FirstOrDefault(item => item.Id == user.Id);
      var userContactObj = _context.UserContacts.FirstOrDefault(item => item.UserId == user.Id);
      var userRoleObj = _context.Users_Role.FirstOrDefault(item => item.UserId == user.Id);

      if (userObj != null)
      {

        userObj.FirstName = user.FirstName;
        userObj.LastName = user.LastName;
        userObj.Email = user.Email;
        userObj.Status = user.Status;
        userObj.CreatedDate = _publicdateTime;

        userContactObj.WhatsApp = user.WhatsApp;
        userContactObj.Viber = user.Viber;
        userContactObj.Phone = user.Phone;
        userContactObj.Phone2 = user.Phone2;

        userRoleObj.RoleId = user.RoleId;
        _context.SaveChanges();
        return "Done";
      }
      else
        return "Error";


    }

    public List<RoleBackend> GetAllRoles()
    {
      var roleObj = _context.Roles.ToList().OrderByDescending(x => x.Id);

      var roleList = new List<RoleBackend>();

      foreach (var role in roleObj)
      {
        roleList.Add(new RoleBackend
        {
          Id = role.Id,
          RoleTitle = role.Role1
        });

      }
      return roleList;
    }
    #endregion

    #region Tenant User

    public List<SystemUserBackend> GetAllTenantUsers()
    {
      var usertype = Convert.ToInt32(UserTypes.Tenant);
      var returnList = new List<SystemUserBackend>();
      var systemUser = _context.SystemUsers.Where(x => x.UserType == usertype).ToList();
      foreach (var user in systemUser)
      {
        returnList.Add(new SystemUserBackend
        {
          Id = user.Id,
          FirstName = user.FirstName,
          LastName = user.LastName,
          Email = user.Email,
          Status = user.Status,
          CreatedDate = user.CreatedDate

        });
      }
      return returnList;
    }

    public string UpdateTenantUser(SystemUserBackend user)
    {
      var userObj = _context.SystemUsers.FirstOrDefault(item => item.Id == user.Id);

      if (userObj != null)
      {
        if (userObj.Status == false)
          userObj.Status = true;
        else
          userObj.Status = false;

        //userObj.FirstName = user.FirstName;
        //userObj.LastName = user.LastName;
        //userObj.Email = user.Email;
        //userObj.Status = user.Status; 
        userObj.CreatedDate = _publicdateTime;

        _context.SaveChanges();
        return "Done";
      }
      else
        return "Error";


    }

    #endregion


    #endregion

    #region FrontEnd

    #region ContactForm


    public string CreateContactForm(ContactForm contactForm)
    {
      var contactFormObj = new ContactForm();
      try
      {
        contactFormObj.FullName = contactForm.FullName;
        contactFormObj.Email = contactForm.Email;
        contactFormObj.Phone = contactForm.Phone;
        contactFormObj.CreatedDate = _publicdateTime;
        contactFormObj.ApprovedBy = 0;
        _context.ContactForms.Add(contactFormObj);
        _context.SaveChanges();

        return "Done";
      }
      catch (Exception)
      {
        return "Error";
        throw;
      }

    }



    #endregion

    #endregion
  }
}
