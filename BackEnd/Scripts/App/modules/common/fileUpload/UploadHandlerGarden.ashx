<%@ WebHandler Language="C#" Class="UploadHandler" %>

using System;
using System.Web;
using System.IO;

public class UploadHandler : IHttpHandler
{

  public void ProcessRequest(HttpContext context)
  {
    string fname = null;
    string imagePth = null;
    if (context.Request.Files.Count > 0)
    {
      HttpFileCollection files = context.Request.Files;
      for (int i = 0; i < files.Count; i++)
      {
        HttpPostedFile file = files[i];
        if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
        {
          string[] testfiles = file.FileName.Split(new char[] { '\\' });
          fname = testfiles[testfiles.Length - 1];
        }
        else
        {
          fname = DateTime.Now.Minute + "_" + DateTime.Now.Millisecond + "." + file.FileName;
          //          fname = Guid.NewGuid() + "." + file.FileName;
          //  fname = Guid.NewGuid() + "." + fname.Split('.')[1];
          imagePth = fname;

          // imagePth = context.Server.MapPath("~/Upload/") + fname;
        }
        fname = Path.Combine(context.Server.MapPath("~/Upload/Garden/"), fname);
        file.SaveAs(fname);

      }
    }
    context.Response.ContentType = "text/plain";
    if (imagePth != null) context.Response.Write(imagePth);
  }

  public bool IsReusable
  {
    get
    {
      return false;
    }
  }

}
