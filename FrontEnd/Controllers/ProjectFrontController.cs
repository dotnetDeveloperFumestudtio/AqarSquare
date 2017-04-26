using System;
using System.Linq;
using AqarSquare.Engine;
using System.Web.Mvc;
using AqarSquare.Engine.BusinessEntities.FrontEnd;
using AqarSquare.Engine.Entities;
using AqarSquare.Engine.Helper;
using PagedList;

namespace FrontEnd.Controllers
{
  public class ProjectFrontController : Controller
  {
    // GET: Project


    #region Home

    public JsonResult SearchOption(string lang)
    {
      return Json(new EngineManager().SearchOption(lang), JsonRequestBehavior.AllowGet);
    }
    public JsonResult SqaureByCity(string lang, string cityId)
    {
      return Json(new EngineManager().GetAllSquareByCityId(lang, cityId), JsonRequestBehavior.AllowGet);
    }
    public JsonResult GetTopTen(string lang)
    {
      return Json(new EngineManager().GetTopTen(lang), JsonRequestBehavior.AllowGet);
    }
    public JsonResult SearchResult(RequestClass requestClass)
    {
      return Json(new EngineManager().SearchResult(requestClass), JsonRequestBehavior.AllowGet);
    }
    #endregion
  }
}