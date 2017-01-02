
using Alfardan.Engine.Entities;
using AqarSquare.Engine.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.ServiceModel.Web;


namespace AqarSquare.Engine
{
  public class EngineManager : IAqarSquareService
  {
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

    readonly AqarSquaresEntities _context = new AqarSquaresEntities();

    #region Helper methods


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


  }
}
