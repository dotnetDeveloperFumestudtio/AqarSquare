using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using AqarSquare.Engine;
using AqarSquare.Engine.BusinessEntities;
using System.Web.Mvc;
using AqarSquare.Engine.BusinessEntities.BackEnd;
using AqarSquare.Engine.Entities;
using Newtonsoft.Json;
using PagedList;

namespace Backend.Controllers
{
  public class ProjectController : Controller
  {
    // GET: Project
    public ActionResult Index()
    {
      return View();
    }

    #region Contact

    public JsonResult FetchContact()
    {
      return Json(new EngineManager().GetCountactUs(), JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdateContact(ContactUsBackend contact)
    {
      var returnValue = 0;
      var returnMsg = "Done";

      returnValue = new EngineManager().UpdatedContact(contact);
      if (returnValue == 0)
        returnMsg = "Error";

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    #endregion

    #region City

    public JsonResult FetchCity()
    {
      return Json(new EngineManager().GetAllCity(), JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchCountCity()
    {
      var countItems = new EngineManager().GetAllCity();
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchCityByPageSize(int pageNumber, int pageSize)
    {
      var city = new EngineManager().GetAllCity().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllCity().Count();
      return Json(new { Data = city.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    }

    public JsonResult CreateCity(CityBackend city)
    {
      string returnValue = new EngineManager().CreateCity(city);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdateCityStatus(CityBackend city)
    {
      var returnValue = 0;
      var returnMsg = "Done";

      returnValue = new EngineManager().UpdateCityStatus(city.Id, city.Status);

      if (returnValue == 0)
        returnMsg = "Error";

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdateCity(CityBackend city)
    {
      var returnValue = new EngineManager().UpdatedCity(city);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeleteCity(CityBackend city)
    {
      var returnMsg = new EngineManager().DeleteCity(city);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeleteCitySelected(int cityId)
    {
      var citybac = new CityBackend();
      citybac.Id = cityId;
      var returnMsg = new EngineManager().DeleteCity(citybac);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    #endregion

    #region Square

    public JsonResult FetchSquare()
    {
      return Json(new EngineManager().GetAllSquare(), JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchCountSquare()
    {
      var countItems = new EngineManager().GetAllSquare();
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchSquareByPageSize(int pageNumber, int pageSize)
    {
      var square = new EngineManager().GetAllSquare().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllSquare().Count();
      return Json(new { Data = square.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    }

    public JsonResult CreateSquare(SquareBackend square)
    {
      string returnValue = new EngineManager().CreateSquare(square);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdateSquareStatus(SquareBackend square)
    {
      var returnValue = 0;
      var returnMsg = "Done";

      returnValue = new EngineManager().UpdateSquareStatus(square.Id, square.Status);

      if (returnValue == 0)
        returnMsg = "Error";

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdateSquare(SquareBackend square)
    {
      var returnValue = new EngineManager().UpdatedSquare(square);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeleteSquare(SquareBackend square)
    {
      var returnMsg = new EngineManager().DeleteSquare(square);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeleteSquareSelected(int squareId)
    {
      var squarebac = new SquareBackend();
      squarebac.Id = squareId;
      var returnMsg = new EngineManager().DeleteSquare(squarebac);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    #endregion

    #region Property

    public JsonResult FetchAllCurrency()
    {
      return Json(new EngineManager().GetAllCurrency(), JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchAllPropertyType()
    {
      return Json(new EngineManager().GetAllPropertyTypeByStatus(), JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchAllContractType()
    {
      return Json(new EngineManager().GetAllContractTypeByStatus(), JsonRequestBehavior.AllowGet);
    }
    public JsonResult FetchCountUserProperty()
    {
      var countItems = new EngineManager().GetAllUserProperty();
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchUserPropertyByPageSize(int pageNumber, int pageSize)
    {
      var property = new EngineManager().GetAllUserProperty().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllUserProperty().Count();
      return Json(new { Data = property.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    }

    public JsonResult CreateProperty(PropertyBackend property)
    {
      string returnValue = new EngineManager().CreateProperty(property);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdatePropertyStatus(PropertyBackend property)
    {
      var returnValue = 0;
      var returnMsg = "Done";

      returnValue = new EngineManager().UpdatePropertyStatus(property.Id, property.Status);

      if (returnValue == 0)
        returnMsg = "Error";

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdateProperty(PropertyBackend property)
    {
      var returnValue = new EngineManager().UpdatedProperty(property);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeleteProperty(PropertyBackend property)
    {
      var returnMsg = new EngineManager().DeleteProperty(property);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeletePropertySelected(int propertyId)
    {
      var propertybac = new PropertyBackend();
      propertybac.Id = propertyId;
      var returnMsg = new EngineManager().DeleteProperty(propertybac);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult GetPropertyInfo(PropertyBackend property)
    {
      return Json(new EngineManager().GetPropertyInfo(property), JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchUserProperty()
    {
      return Json(new EngineManager().GetAllUserProperty(), JsonRequestBehavior.AllowGet);
    }

    public JsonResult InsertImageBalaconies(int userId,int propertyId,string image)
    {
      var obj = new ImageBalacony();
      obj.PropertyId = propertyId;
      obj.Image = image;
      obj.CreatedBy = userId;
      return Json(new EngineManager().InsertImageBalaconies(obj), JsonRequestBehavior.AllowGet);
    }
    public JsonResult DeleteImageBalaconies(ImageBalacony image)
    {
      return Json(new EngineManager().DeleteImageBalaconies(image), JsonRequestBehavior.AllowGet);
    }
    #endregion
    //#region Home
    //public JsonResult FetchTop5User()
    //{
    //  return Json(new EngineManager().GetAllUsers().Take(5), JsonRequestBehavior.AllowGet);
    //}
    //public JsonResult GetAttractionsCount()
    //{
    //  var countItems = new EngineManager().GetAllAttractionsCount();
    //  return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    //}
    //public JsonResult FetshLatestViolation()
    //{
    //  return Json(new EngineManager().LatestedViolation(), JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult GetCountryStatistics()
    //{
    //  return Json(new EngineManager().GetCountryStatistics(), JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult CheckUser(string username, string password)
    //{
    //  return Json(new EngineManager().AdminLogIn(username, password), JsonRequestBehavior.AllowGet);
    //}
    //public JsonResult AdminForgetPassword(string userEmail)
    //{
    //  return Json(new EngineManager().AdminForgetPassword(userEmail), JsonRequestBehavior.AllowGet);
    //}
    //public JsonResult ChangePassword(string userId, string oldPassword, string newPassword)
    //{
    //  return Json(new EngineManager().ChangePassword(userId, oldPassword, newPassword), JsonRequestBehavior.AllowGet);
    //}
    //#endregion



    //#region Languages

    //public JsonResult FetchLanguages()
    //{
    //  return Json(new EngineManager().GetAllLanguage(), JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult FetchCountLanguages()
    //{
    //  var countItems = new EngineManager().GetAllLanguage();
    //  return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult FetchLanguagesByPageSize(int pageNumber, int pageSize)
    //{
    //  var languages = new EngineManager().GetAllLanguage().ToPagedList(pageNumber, pageSize);

    //  var countItems = new EngineManager().GetAllLanguage().Count();

    //  return Json(new { Data = languages.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    //}

    //public JsonResult CreateLanguages(LanguagesList languages)
    //{
    //  var returnValue = 0;
    //  var returnMsg = "Done";

    //  returnValue = new EngineManager().CreateLanguage(languages);
    //  if (returnValue == 0)
    //    returnMsg = "Error";

    //  return Json(returnMsg, JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult UpdateLanguages(LanguagesList languages)
    //{
    //  var returnValue = 0;
    //  var returnMsg = "Done";

    //  returnValue = new EngineManager().UpdatedLanguage(languages);
    //  if (returnValue == 0)
    //    returnMsg = "Error";

    //  return Json(returnMsg, JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult ChangeStatus(LanguagesList languages)
    //{
    //  var returnValue = 0;
    //  var returnMsg = "Done";

    //  returnValue = new EngineManager().ChangeLanguageStatus(languages);
    //  if (returnValue == 0)
    //    returnMsg = "Error";

    //  return Json(returnMsg, JsonRequestBehavior.AllowGet);
    //}

    //#endregion

    //#region  Report

    //public JsonResult FetchReport()
    //{
    //  return Json(new EngineManager().GetAllReports(), JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult FetchCountReport()
    //{
    //  var countItems = new EngineManager().GetAllReports();
    //  return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult FetchReportByPageSize(int pageNumber, int pageSize)
    //{
    //  var report = new EngineManager().GetAllReports().ToPagedList(pageNumber, pageSize);
    //  var countItems = new EngineManager().GetAllReports().Count();

    //  return Json(new { Data = report.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    //}

    //#endregion

    //#region TopTen
    //public JsonResult FetchTopTen()
    //{
    //  return Json(new EngineManager().GetAllTopTen(), JsonRequestBehavior.AllowGet);
    //}


    //public JsonResult DeleteTopTen()
    //{
    //  var returnValue = 0;
    //  var returnMsg = "Done";

    //  returnValue = new EngineManager().DeleteTopTen();
    //  if (returnValue == 0)
    //    returnMsg = "Error";

    //  return Json(returnMsg, JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult CreateStaticTopTen(List<int> topTenBackEnd)
    //{
    //  var returnValue = 0;
    //  var returnMsg = "Done";

    //  returnValue = new EngineManager().CreateTopTen(topTenBackEnd);
    //  if (returnValue == 0)
    //    returnMsg = "Error";
    //  if (returnValue == 2)
    //    returnMsg = "ErrorCount";
    //  return Json(returnMsg, JsonRequestBehavior.AllowGet);
    //}
    //#endregion

    //#region Notification


    //public JsonResult CreateNotification(Notification notification)
    //{
    //  var returnMsg = "Done";
    //  new EngineManager().SendNotification(notification);


    //  return Json(returnMsg, JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult SendPush(Notification notification)
    //{

    //  bool status = true;
    //  var request = WebRequest.Create("https://onesignal.com/api/v1/notifications") as HttpWebRequest;
    //  new EngineManager().SaveNotification(notification);
    //  request.KeepAlive = true;
    //  request.Method = "POST";
    //  request.ContentType = "application/json";

    //  request.Headers.Add("authorization", "Basic Njk2MTc5OTQtMmQyMi00ZmNjLWFiNzItYTQxYzEwNjVkOTY3");

    //  byte[] byteArray = Encoding.UTF8.GetBytes("{"
    //                                          + "\"app_id\": \"df067cc1-8cf5-435c-9b31-6577a8478060\","
    //                                         + "\"contents\": {\"en\": \"" + notification.Description + "\"},"
    //                                            + "\"headings\": {\"en\": \"" + notification.Title + "\"},"
    //                                             //+ "\"ios_badgeType\": [\"Increase\"]}"
    //                                             //+ "\"ios_badgeCount\": [\"" + 1 + "\"]}"
    //                                              + "\"included_segments\": [\"All\"]}");

    //  string responseContent = null;

    //  try
    //  {
    //    using (var writer = request.GetRequestStream())
    //    {
    //      writer.Write(byteArray, 0, byteArray.Length);
    //    }

    //    using (var response = request.GetResponse() as HttpWebResponse)
    //    {
    //      using (var reader = new StreamReader(response.GetResponseStream()))
    //      {
    //        responseContent = reader.ReadToEnd();
    //      }
    //    }
    //  }
    //  catch (WebException ex)
    //  {
    //    status = false;
    //  }

    //  return Json(
    //          status
    //          ? new { success = true, responseText = "Your message have been sent" }
    //          : new { success = false, responseText = "Something went wrong" },
    //          JsonRequestBehavior.AllowGet);
    //}

    //#endregion

    //#region Statistics

    //public JsonResult GetObject3DStatistics()
    //{
    //  return Json(new EngineManager().GetObject3DStatistics(), JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult GetLanguageStatistics()
    //{
    //  return Json(new EngineManager().GetLanguageStatistics(), JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult GetSelfieStatistics()
    //{
    //  return Json(new EngineManager().GetSelfieStatistics(), JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult GetQrCodeStatistics()
    //{
    //  return Json(new EngineManager().GetQrCodeStatistics(), JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult GetAttractionsStatistics()
    //{
    //  return Json(new EngineManager().GetAttractionsStatistics(), JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult FetchAttractionByPageSizeRankStatistics(int pageNumber, int pageSize)
    //{
    //  var attraction = new EngineManager().GetAllAttractionsRankStatistics().ToPagedList(pageNumber, pageSize);
    //  var countItems = new EngineManager().GetAllAttractionsRankStatistics().Count();

    //  return Json(new { Data = attraction.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    //}
    //public JsonResult GetUserAgeStatistics()
    //{
    //  return Json(new EngineManager().GetUserAgeStatistics(), JsonRequestBehavior.AllowGet);
    //}

    //public JsonResult GetNotificationStatistics()
    //{
    //  return Json(new EngineManager().GetNotificationStatistics(), JsonRequestBehavior.AllowGet);
    //}


    //#endregion
  }
}