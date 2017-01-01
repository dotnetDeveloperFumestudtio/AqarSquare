using AqarSquare.Engine.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AqarSquare.Engine.BusinessEntities
{
    public class SystemUser : BusinessEntityBase
    {
        #region Constructor(s)
        public SystemUser()
            : base()
        {
        }

        public SystemUser(SystemUserEntity entity, HeaderData header)
            : base(header)
        {
            Convert<SystemUserEntity>(entity);
        }
        #endregion

        #region Properties
        public int SystemUserID { get; set; }
        [Required]
        [StringLength(300)]
        [Display(Name = "Name")]
        public string Name { get; set; }
        [Required]
        [StringLength(300)]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }
        [Display(Name = "Manage Entertainments")]
        public bool ManageEntertainments { get; set; }
        [Display(Name = "Manage Wellnesses")]
        public bool ManageWellnesses { get; set; }
        [Display(Name = "Manage Local Business Directories")]
        public bool ManageLocalBusinessDirectories { get; set; }
        [Display(Name = "Manage Limousine")]
        public bool ManageLimousine { get; set; }
        [Display(Name = "Manage Concierge")]
        public bool ManageConcierge { get; set; }
        [Display(Name = "Manage Push Notifications")]
        public bool ManagePushNotifications { get; set; }
        [Display(Name = "Manage System Users")]
        public bool ManageSystemUsers { get; set; }
        #endregion
    }
}
