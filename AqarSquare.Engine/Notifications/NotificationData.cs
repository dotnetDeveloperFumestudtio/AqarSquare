using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AqarSquare.Engine.Notifications
{
    [Serializable]
    public class NotificationData
    {
        [JsonProperty("Title")]
        private String Title;
        [JsonProperty("Body")]
        private String Body;

        [JsonProperty("badge")]
        private int badge = 3;
        
        //[JsonProperty("sound")]
        //private String sound = "default";

        

        public String getTitle()
        {
            return Title;
        }
        public void setTitle(String title)
        {
            this.Title = title;
        }
        public String getBody()
        {
            return Body;
        }
        public void setBody(String body)
        {
            this.Body = body;
        }

        [JsonProperty("Type")]
        public string Type { get; set; }
    }
}
