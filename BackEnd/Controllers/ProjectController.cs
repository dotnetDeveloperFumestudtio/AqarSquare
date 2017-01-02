using AqarSquare.Engine;
using AqarSquare.Engine.BusinessEntities;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Backend.Controllers
{
  public class ProjectController : Controller
  {
    // GET: Project
    public ActionResult Index()
    {
      return View();
    }

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

    //#region Contact

    //public JsonResult FetchContact()
    //{
    //  return Json(new EngineManager().Contact(), JsonRequestBehavior.AllowGet);

    //}

    //public JsonResult UpdateContact(Contact contact)
    //{
    //  var returnValue = 0;
    //  var returnMsg = "Done";

    //  returnValue = new EngineManager().UpdatedContact(contact);
    //  if (returnValue == 0)
    //    returnMsg = "Error";

    //  return Json(returnMsg, JsonRequestBehavior.AllowGet);
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