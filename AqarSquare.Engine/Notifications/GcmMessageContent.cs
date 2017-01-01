using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AqarSquare.Engine.Notifications
{
    [Serializable]
    public class GcmMessageContent
    {
        [JsonProperty("registration_ids")]
        private List<String> registration_ids;
        [JsonProperty("data")]
        private NotificationData data;

        public GcmMessageContent()
        {

        }

        public void addRegId(String regId)
        {

            if (registration_ids == null)
            {
                registration_ids = new List<String>();
            }
            registration_ids.Add(regId);
        }

        public void setData(NotificationData data)
        {
            this.data = data;
        }
    }
}
