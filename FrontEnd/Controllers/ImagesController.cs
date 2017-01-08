using System;
using System.IO;

namespace FrontEnd.Controllers
{
  public class ImagesController : ApiController
  {
    //[System.Web.Http.HttpPost]
    //public async Task<FileResult> UploadImage()
    //{
    //  // Verify that this is an HTML Form file upload request
    //  if (!Request.Content.IsMimeMultipartContent("form-data"))
    //  {
    //    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.UnsupportedMediaType));
    //  }

    //  // Create a stream provider for setting up output streams
    //  var streamProvider = new MultipartMemoryStreamProvider();

    //  try
    //  {
    //    FileResult result = new FileResult
    //    {
    //      FileId = Guid.Empty,
    //      Success = false,
    //      ErrorMessage = "No Files sent to be uploaded",
    //    };

    //    // Read the MIME multipart asynchronously content using the stream provider we just created.
    //    await Request.Content.ReadAsMultipartAsync(streamProvider).ContinueWith(x =>
    //    {
    //      // can I only expect 1 item here?
    //      foreach (var item in x.Result.Contents)
    //      {
    //        // if it's an Excel Sheet
    //        //if (item.Headers.ContentType != null && (
    //        //    item.Headers.ContentType.MediaType.ToString().Contains("image/png") ||
    //        //    item.Headers.ContentType.MediaType.ToString().Contains("image/jpeg") ||
    //        //    item.Headers.ContentType.MediaType.ToString().Contains("image/gif") ||
    //        //    item.Headers.ContentType.MediaType.ToString().Contains("image/x-icon") ||
    //        //    item.Headers.ContentType.MediaType.ToString().Contains("image/pjpeg") ||
    //        //    item.Headers.ContentType.MediaType.ToString().Contains("image/tiff") ||
    //        //    item.Headers.ContentType.MediaType.ToString().Contains("image/x-tiff") ||
    //        //    item.Headers.ContentType.MediaType.ToString().Contains("obj")  
    //        //    ))
    //        //{
    //        try
    //        {

    //          var imageStream = item.ReadAsStreamAsync().Result;


    //          Guid fileId;
    //          fileId = _uploadImageFile(imageStream, item.Headers.ContentDisposition.FileName.Replace("\"", string.Empty));

    //          // Create response
    //          result = new FileResult
    //          {
    //            FileId = fileId,
    //            Success = true,
    //            ErrorMessage = string.Empty
    //          };
    //          break;
    //        }
    //        catch (Exception ex)
    //        {
    //          result = new FileResult
    //          {
    //            FileId = Guid.Empty,
    //            Success = false,
    //            ErrorMessage = ex.ToString(),
    //          };
    //        }
    //        // }
    //      }
    //    });

    //    return result;
    //  }
    //  catch (Exception ex)
    //  {
    //    return new FileResult
    //    {
    //      FileId = Guid.Empty,
    //      Success = false,
    //      ErrorMessage = ex.ToString(),
    //    };
    //  }
    //}

    //[System.Web.Http.HttpGet]
    //public HttpResponseMessage DownloadImage(Guid imageId)
    //{
    //  var stream = _getImageFile(imageId);

    //  if (stream != null)
    //  {
    //    var result = new HttpResponseMessage(HttpStatusCode.OK);

    //    result.Content = new StreamContent(stream);
    //    result.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
    //    return result;
    //  }
    //  else
    //  {
    //    throw new HttpResponseException(HttpStatusCode.NotFound);
    //  }
    //}

    //private Stream _getImageFile(Guid imageId)
    //{
    //  return new EngineManager().GetFileByGuid(imageId);
    //}
    ////private Stream _getImageFile(int imageId)
    ////{
    ////  // var conv = ToGuid(imageId);
    ////  var returnVlaue = new EngineManager()._getFile(imageId);

    ////  return returnVlaue;
    ////}

    //private Guid _uploadImageFile(Stream imageStream, string imageName)
    //{
    //  byte[] bytes = ReadFully(imageStream);
    //  var imageReturn = new EngineManager().SavePictureTable(imageName, bytes);
    // // new EngineManager().SaveUserImage(imageReturn);
    //  return imageReturn;
    //}

    private static string GenerateRandomFilename(string oldName)
    {
      var lastDotIndex = oldName.LastIndexOf('.');
      var name = oldName.Substring(lastDotIndex + 1);
      var extension = oldName.Substring(lastDotIndex + 1);

      return name + Guid.NewGuid().ToString() + "." + extension;
    }

    private static byte[] ReadFully(Stream input)
    {
      byte[] buffer = new byte[16 * 1024];
      using (MemoryStream ms = new MemoryStream())
      {
        int read;

        while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
        {
          ms.Write(buffer, 0, read);
        }

        return ms.ToArray();
      }
    }
  }
}
