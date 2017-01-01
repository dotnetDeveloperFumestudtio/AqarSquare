using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AqarSquare.Engine.Notifications
{
    [Serializable]
    public class GcmMessageIOSContent
    {
        
        
        [JsonProperty("notification")]
        private NotificationData notification;
        //[JsonProperty("content_available")]
        //private bool content_available = true;
        

        [JsonProperty("priority")]
        private string priority = "high";

        [JsonProperty("to")]
        private String to;

        public GcmMessageIOSContent()
        {

        }

        public String getTo()
        {
            return to;
        }
        public void setTo(String to)
        {
            this.to = to;
        }
        //public bool isContent_available()
        //{
        //    return content_available;
        //}
        //public void setContent_available(bool content_available)
        //{
        //    this.content_available = content_available;
        //}
        public NotificationData getNotification()
        {
            return notification;
        }
        public void setNotification(NotificationData notification)
        {
            this.notification = notification;
        }
    }
}
