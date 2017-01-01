using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AqarSquare.Engine.BusinessEntities
{
    public class HeaderData
    {
        public Languages CurrentLanguage { get; set; }
        public Devices CurrentDevice { get; set; }
        public string UserToken { get; set; }
        public string AppVersion { get; set; }
    }
}
