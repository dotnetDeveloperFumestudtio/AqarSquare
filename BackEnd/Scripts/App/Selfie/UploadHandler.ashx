<%@ WebHandler Language="C#" Class="UploadHandler" %>

using System;
using System.Net;
using System.Web;
using System.IO;

public class UploadHandler : IHttpHandler
{
  static String sourcefilepath = "107.150.57.66/Events/"; // e.g. "d:/test.docx"
  private const String Ftpurl = "ftp://107.150.57.66/"; // e.g. ftp://serverip/foldername/foldername
  private const String Ftpusername = "User.ETA"; // e.g. username
  private const String Ftppassword = "Password.ETA"; // e.g. password

  private static void UploadFileToFtp(string source)
  {
    try
    {

      var fileName = Path.GetFileName(sourcefilepath);
      var request = (FtpWebRequest)WebRequest.Create("ftp://107.150.57.66/Events/" + source);

      request.Method = WebRequestMethods.Ftp.UploadFile;
      request.Credentials = new NetworkCredential(Ftpusername, Ftppassword);
      request.UsePassive = true;
      request.UseBinary = true;
      request.KeepAlive = false;

      using (var fileStream = File.OpenRead(sourcefilepath))
      {
        using (var requestStream = request.GetRequestStream())
        {
          fileStream.CopyTo(requestStream);
          requestStream.Close();
        }
      }

      var response = (FtpWebResponse)request.GetResponse();
      Console.WriteLine("Upload done: {0}", response.StatusDescription);
      response.Close();
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

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
          UploadFileToFtp(file.FileName);
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
