<%@ WebHandler Language="C#" Class="UploadHandler" %>

using System;
using System.Net;
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
          fname = file.FileName;
          imagePth = file.FileName;

        }
        fname = Path.Combine(context.Server.MapPath("~/Images/"), fname);
        file.SaveAs(fname);
         
      }
    }
    context.Response.ContentType = "text/plain";
    //UploadFileToFtp(imagePth);

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
