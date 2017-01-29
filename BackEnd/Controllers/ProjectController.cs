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
using AqarSquares;
using Newtonsoft.Json;
using PagedList;
using PhotoSession = AqarSquare.Engine.BusinessEntities.BackEnd.PhotoSession;
using Reservation = AqarSquare.Engine.BusinessEntities.BackEnd.Reservation;

namespace Backend.Controllers
{
  public class ProjectController : Controller
  {
    // GET: Project
    public ActionResult Index()
    {
      return View();
    }
    #region Home
    public JsonResult TotalCountUserProperty()
    {
      return Json(new EngineManager().GetAllUserProperty(), JsonRequestBehavior.AllowGet);
    }
    public JsonResult TotalCountAdminProperty()
    {
      return Json(new EngineManager().GetAllAdminProperty(), JsonRequestBehavior.AllowGet);
    }
    public JsonResult TotalCountUser()
    {
      return Json(new EngineManager().GetAllTenantUsers().Count(), JsonRequestBehavior.AllowGet);
    }
    #endregion

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
      var city = new EngineManager().GetAllCity();

      return Json(new { Data = city.ToList() }, JsonRequestBehavior.AllowGet);

      //  return Json(new EngineManager().GetAllCity().ToList(), JsonRequestBehavior.AllowGet);
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

    public JsonResult DeleteSelectedCity(int[] itemsSelected)
    {
      return Json(new EngineManager().DeleteSelected(itemsSelected), JsonRequestBehavior.AllowGet);
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

    public JsonResult FetchUserProperty()
    {
      var obj = new EngineManager().GetAllUserProperty();
      return Json(new { Data = obj.ToList() }, JsonRequestBehavior.AllowGet);
    }
    public JsonResult FetchAdminProperty()
    {
      var obj = new EngineManager().GetAllAdminProperty();
      return Json(new { Data = obj.ToList() }, JsonRequestBehavior.AllowGet);
    }
    public JsonResult FetchUserPropertyByPageSize(int pageNumber, int pageSize)
    {
      var property = new EngineManager().GetAllUserProperty().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllUserProperty().Count();
      return Json(new { Data = property.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    }
    public JsonResult FetchAdminPropertyByPageSize(int pageNumber, int pageSize)
    {
      var property = new EngineManager().GetAllAdminProperty().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllAdminProperty().Count();
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

      returnValue = new EngineManager().UpdatePropertyStatus(property);

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


    public JsonResult GetAllImageBalaconies(ImageBalacony image)
    {
      return Json(new EngineManager().GetAllImageBalaconies(image), JsonRequestBehavior.AllowGet);
    }
    public JsonResult InsertImageBalaconies(int userId, int propertyId, string image)
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


    public JsonResult GetAllImageBathroom(ImageBathroom image)
    {
      return Json(new EngineManager().GetAllImageBathroom(image), JsonRequestBehavior.AllowGet);
    }
    public JsonResult InsertImageBathroom(int userId, int propertyId, string image)
    {
      var obj = new ImageBathroom();
      obj.PropertyId = propertyId;
      obj.Image = image;
      obj.CreatedBy = userId;
      return Json(new EngineManager().InsertImageBathroom(obj), JsonRequestBehavior.AllowGet);
    }
    public JsonResult DeleteImageBathroom(ImageBathroom image)
    {
      return Json(new EngineManager().DeleteImageBathroom(image), JsonRequestBehavior.AllowGet);
    }


    public JsonResult GetAllImageBedroom(ImageBedroom image)
    {
      return Json(new EngineManager().GetAllImageBedroom(image), JsonRequestBehavior.AllowGet);
    }
    public JsonResult InsertImageBedroom(int userId, int propertyId, string image)
    {
      var obj = new ImageBedroom();
      obj.PropertyId = propertyId;
      obj.Image = image;
      obj.CreatedBy = userId;
      return Json(new EngineManager().InsertImageBedroom(obj), JsonRequestBehavior.AllowGet);
    }
    public JsonResult DeleteImageBedroom(ImageBedroom image)
    {
      return Json(new EngineManager().DeleteImageBedroom(image), JsonRequestBehavior.AllowGet);
    }


    public JsonResult GetAllImageReception(ImageReception image)
    {
      return Json(new EngineManager().GetAllImageReception(image), JsonRequestBehavior.AllowGet);
    }
    public JsonResult InsertImageReception(int userId, int propertyId, string image)
    {
      var obj = new ImageReception();
      obj.PropertyId = propertyId;
      obj.Image = image;
      obj.CreatedBy = userId;
      return Json(new EngineManager().InsertImageReception(obj), JsonRequestBehavior.AllowGet);
    }
    public JsonResult DeleteImageReception(ImageReception image)
    {
      return Json(new EngineManager().DeleteImageReception(image), JsonRequestBehavior.AllowGet);
    }


    public JsonResult GetAllImageGardenByPropertyId(int propertyId)
    {
      return Json(new EngineManager().GetAllImageGarden(propertyId), JsonRequestBehavior.AllowGet);
    }
    public JsonResult GetAllImageGarden(ImageGarden image)
    {
      return Json(new EngineManager().GetAllImageGarden(image), JsonRequestBehavior.AllowGet);
    }
    public JsonResult InsertImageGarden(int userId, int propertyId, string image)
    {
      var obj = new ImageGarden();
      obj.PropertyId = propertyId;
      obj.Image = image;
      obj.CreatedBy = userId;
      return Json(new EngineManager().InsertImageGarden(obj), JsonRequestBehavior.AllowGet);
    }
    public JsonResult DeleteImageGarden(ImageGarden image)
    {
      return Json(new EngineManager().DeleteImageGarden(image), JsonRequestBehavior.AllowGet);
    }
    public JsonResult DeleteSelectedGardenImage(int[] itemsSelected)
    {
      return Json(new EngineManager().DeleteSelectedImageGarden(itemsSelected), JsonRequestBehavior.AllowGet);
    }

    public JsonResult GetAllImagePool(ImagePool image)
    {
      return Json(new EngineManager().GetAllImagePool(image), JsonRequestBehavior.AllowGet);
    }
    public JsonResult InsertImagePool(int userId, int propertyId, string image)
    {
      var obj = new ImagePool();
      obj.PropertyId = propertyId;
      obj.Image = image;
      obj.CreatedBy = userId;
      return Json(new EngineManager().InsertImagePool(obj), JsonRequestBehavior.AllowGet);
    }
    public JsonResult DeleteImagePool(ImagePool image)
    {
      return Json(new EngineManager().DeleteImagePool(image), JsonRequestBehavior.AllowGet);
    }

    public JsonResult CountUnApprovedProperty()
    {
      return Json(new EngineManager().CountUnApprovedProperty(), JsonRequestBehavior.AllowGet);
    }
    public JsonResult GetPropertyById(string propertyId)
    {
      return Json(new EngineManager().GetPropertyById(propertyId), JsonRequestBehavior.AllowGet);
    }

    #endregion

    #region Contact


    public JsonResult FetchContactForm()
    {
      var countItems = new EngineManager().GetAllContactForm();
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchContactFormByPageSize(int pageNumber, int pageSize)
    {
      var form = new EngineManager().GetAllContactForm().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllContactForm().Count();
      return Json(new { Data = form.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    }

    public JsonResult UpdateFormContactApprove(ContactFormBackend contactForm)
    {
      var returnMsg = "";
      returnMsg = new EngineManager().UpdatedContactForm(contactForm);
      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    #endregion

    #region Reservation


    public JsonResult FetchReservation()
    {
      var countItems = new EngineManager().GetAllReservation();
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchReservationByPageSize(int pageNumber, int pageSize)
    {
      var form = new EngineManager().GetAllReservation().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllReservation().Count();
      return Json(new { Data = form.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    }

    public JsonResult UpdateReservationApprove(Reservation reservation)
    {
      var returnMsg = "";
      returnMsg = new EngineManager().UpdatedReservation(reservation);
      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    #endregion

    #region PhotoSession


    public JsonResult FetchPhotoSession()
    {
      var countItems = new EngineManager().GetAllPhotoSession();
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchPhotoSessionByPageSize(int pageNumber, int pageSize)
    {
      var form = new EngineManager().GetAllPhotoSession().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllPhotoSession().Count();
      return Json(new { Data = form.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    }

    public JsonResult UpdatePhotoSessionApprove(PhotoSession photoSession)
    {
      var returnMsg = "";
      returnMsg = new EngineManager().UpdatedPhotoSession(photoSession);
      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    #endregion

    #region Admin user
    public JsonResult Login(string email, string password)
    {
      var userBackEnd = new SystemUserBackend();
      userBackEnd.Email = email;
      userBackEnd.Password = password;
      var obj = new EngineManager().Login(userBackEnd);

      return Json(new { Data = obj }, JsonRequestBehavior.AllowGet);

    }
    public JsonResult FetchAdminUser()
    {
      var obj = new EngineManager().GetAllAdminUsers();

      return Json(new { Data = obj.ToList() }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchCountAdminUser()
    {
      var countItems = new EngineManager().GetAllAdminUsers();
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchAdminUserByPageSize(int pageNumber, int pageSize)
    {
      var User = new EngineManager().GetAllAdminUsers().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllAdminUsers().Count();
      return Json(new { Data = User.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    }

    public JsonResult CreateAdminUser(SystemUserBackend user)
    {
      string returnValue = new EngineManager().CreateAdminUser(user);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdateAdminUser(SystemUserBackend user)
    {
      var returnMsg = new EngineManager().UpdateAdminUser(user);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    #endregion

    #region Tenant user

    public JsonResult FetchTenantUser()
    {
      var obj = new EngineManager().GetAllTenantUsers();

      return Json(new { Data = obj.ToList() }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdateTenantUser(SystemUserBackend user)
    {
      var returnMsg = new EngineManager().UpdateTenantUser(user);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    #endregion

    #region PropertyType

    public JsonResult FetchPropertyType()
    {
      var propertyType = new EngineManager().GetAllPropertyType();

      return Json(new { Data = propertyType.ToList() }, JsonRequestBehavior.AllowGet);

    }

    public JsonResult FetchCountPropertyType()
    {
      var countItems = new EngineManager().GetAllPropertyType();
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchPropertyTypeByPageSize(int pageNumber, int pageSize)
    {
      var propertyType = new EngineManager().GetAllPropertyType().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllPropertyType().Count();
      return Json(new { Data = propertyType.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    }

    public JsonResult CreatePropertyType(PropertyTypeBackend propertyType)
    {
      string returnValue = new EngineManager().CreatePropertyType(propertyType);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdatePropertyTypeStatus(PropertyTypeBackend propertyType)
    {
      var returnValue = 0;
      var returnMsg = "Done";

      returnValue = new EngineManager().UpdatePropertyTypeStatus(propertyType.Id, propertyType.Status);

      if (returnValue == 0)
        returnMsg = "Error";

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdatePropertyType(PropertyTypeBackend propertyType)
    {
      var returnValue = new EngineManager().UpdatedPropertyType(propertyType);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeletePropertyType(PropertyTypeBackend propertyType)
    {
      var returnMsg = new EngineManager().DeletePropertyType(propertyType);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeletePropertyTypeSelected(int propertyTypeId)
    {
      var propertyTypebac = new PropertyTypeBackend();
      propertyTypebac.Id = propertyTypeId;
      var returnMsg = new EngineManager().DeletePropertyType(propertyTypebac);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeleteSelectedPropertyType(int[] itemsSelected)
    {
      return Json(new EngineManager().DeleteSelected(itemsSelected), JsonRequestBehavior.AllowGet);
    }

    #endregion

    #region ContractType

    public JsonResult FetchContractType()
    {
      var ContractType = new EngineManager().GetAllContractType();

      return Json(new { Data = ContractType.ToList() }, JsonRequestBehavior.AllowGet);

      //  return Json(new EngineManager().GetAllContractType().ToList(), JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchCountContractType()
    {
      var countItems = new EngineManager().GetAllContractType();
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchContractTypeByPageSize(int pageNumber, int pageSize)
    {
      var ContractType = new EngineManager().GetAllContractType().ToPagedList(pageNumber, pageSize);
      var countItems = new EngineManager().GetAllContractType().Count();
      return Json(new { Data = ContractType.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);

    }

    public JsonResult CreateContractType(ContractTypeBackend contractType)
    {
      string returnValue = new EngineManager().CreateContractType(contractType);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdateContractTypeStatus(ContractTypeBackend contractType)
    {
      var returnValue = 0;
      var returnMsg = "Done";

      returnValue = new EngineManager().UpdateContractTypeStatus(contractType.Id, contractType.Status);

      if (returnValue == 0)
        returnMsg = "Error";

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult UpdateContractType(ContractTypeBackend contractType)
    {
      var returnValue = new EngineManager().UpdatedContractType(contractType);

      return Json(returnValue, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeleteContractType(ContractTypeBackend contractType)
    {
      var returnMsg = new EngineManager().DeleteContractType(contractType);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeleteContractTypeSelected(int contractTypeId)
    {
      var contractTypebac = new ContractTypeBackend();
      contractTypebac.Id = contractTypeId;
      var returnMsg = new EngineManager().DeleteContractType(contractTypebac);

      return Json(returnMsg, JsonRequestBehavior.AllowGet);
    }

    public JsonResult DeleteSelectedContractType(int[] itemsSelected)
    {
      return Json(new EngineManager().DeleteSelected(itemsSelected), JsonRequestBehavior.AllowGet);
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