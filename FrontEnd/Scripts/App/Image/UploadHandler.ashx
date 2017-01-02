<%@ WebHandler Language="C#" Class="UploadHandler" %>

using System;
using System.Diagnostics;
using System.Net;
using System.Web;
using System.IO;
using ETA.Engine;
using ETA.Engine.BusinessEntities;

public class UploadHandler : IHttpHandler
{
  
  public void ProcessRequestData(HttpContext context)
  {
    string fname = null;
    string imagePth = null; 
    if (context.Request.Files.Count > 0)
    {

      
      HttpFileCollection files = context.Request.Files;

      for (int i = 0; i < files.Count; i++)
      {
        HttpPostedFile file = files[i];

        byte[] data = new byte[file.ContentLength];
        file.InputStream.Read(data, 0, file.ContentLength);
        imagePth = data.ToString();
        //obj.ImageUrl = imagePth;
        //new EngineManager().UpdateImage(obj);
        //if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
        //{
        //  string[] testfiles = file.FileName.Split(new char[] { '\\' });
        //  fname = testfiles[testfiles.Length - 1]; 
        //}
        //else
        //{
        //  fname = file.FileName;
        //  imagePth = file.FileName;

        //}
        //fname = Path.Combine(context.Server.MapPath("~/Images/"), fname);
        //file.SaveAs(fname);

        //var proc = new Process();
        //proc.StartInfo.FileName =
        //  "ffmpeg -i '" + fname + "' -an -ss 00:00:01 -t 00:01:31 -r 10 -s 550x450 -aspect 5:3 foo%3d.png ";
        //proc.StartInfo.Arguments = "";
        //proc.StartInfo.UseShellExecute = false;
        //proc.StartInfo.RedirectStandardInput = true;
        //proc.StartInfo.RedirectStandardOutput = true;
        //proc.Start();
        //proc.WaitForExit();
      }
    }
    context.Response.ContentType = "text/plain";
    //UploadFileToFtp(imagePth);

    if (imagePth != null) context.Response.Write(imagePth);
  }

  public void ProcessRequest(HttpContext context)
  {
    throw new NotImplementedException();
  }

  public bool IsReusable
  {
    get
    {
      return false;
    }
  }

}
