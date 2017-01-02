using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Web_App.Models;

namespace Web_App.Controllers
{
  public class MessageController : Controller
  {
    // GET: Message
    private readonly ApplicationDbContext _db = new ApplicationDbContext();

    public JsonResult CheckUser(string username, string password)
    {
      var messageList = _db.LogIn.FirstOrDefault(x => x.Username == username && x.Password == password);

      return Json(messageList, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchMessages()
    {
      return Json(_db.Messages.ToList(), JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchCountMessages()
    {
      var countItems = _db.Messages.ToList();
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchMessagesByPageSize(int pageNumber, int pageSize)
    {
      var message = _db.Messages.ToList().ToPagedList(pageNumber, pageSize);
      var countItems = _db.Messages.ToList().Count();

      return Json(new { Data = message.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult CreateMessages(string msgtitle, string msgcontent)
    {
      var message = new Message();
      message.MsgTitle = msgtitle;
      message.MsgContent = msgcontent;
      message.MsgDateTime = DateTime.Now;
      _db.Messages.Add(message);
      _db.SaveChanges();

      return Json(message, JsonRequestBehavior.AllowGet);
    }
     
    // users

    public JsonResult FetchUsers()
    {
      return Json(_db.SystemUsers.ToList().Where(x => x.Connected), JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchCountUsers()
    {
      var countItems = _db.SystemUsers.ToList().Where(x => x.Connected);
      return Json(new { TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult FetchUserByPageSize(int pageNumber, int pageSize)
    {
      var user = _db.SystemUsers.ToList().Where(x => x.Connected).ToPagedList(pageNumber, pageSize);
      var countItems = _db.SystemUsers.Count(x => x.Connected);

      return Json(new { Data = user.ToList(), TotalCount = countItems }, JsonRequestBehavior.AllowGet);
    }

    public JsonResult SendUserAlerts(List<int> userIds)
    {
      var getMsgId = _db.Messages.ToList().LastOrDefault();
      int msgId = getMsgId.Id;
      var msgUser = new UserMsg();
      foreach (var userId in userIds)
      {
        var checkRecordIsExist = _db.UserMsgs.FirstOrDefault(x => x.MsgId == msgId && x.UserId == userId);
        if (checkRecordIsExist != null)
          break;
        msgUser.MsgId = msgId;
        msgUser.UserId = userId;
        msgUser.Readed = false;
        msgUser.ReadedDateTime = DateTime.Now;
        msgUser.Delivered = true;
        msgUser.DeliveredDateTime = DateTime.Now;
        _db.UserMsgs.Add(msgUser);
        _db.SaveChanges();
      }

      return Json(msgUser, JsonRequestBehavior.AllowGet);
    }
  }
}