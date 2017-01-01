//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AqarSquare.Engine.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class EntertainmentEntity
    {
        public EntertainmentEntity()
        {
            this.EntertainmentReservations = new HashSet<EntertainmentReservationEntity>();
        }
    
        public int EntertainmentID { get; set; }
        public string TitleEn { get; set; }
        public string TitleAr { get; set; }
        public string ImageURL { get; set; }
        public string BriefEn { get; set; }
        public string BriefAr { get; set; }
        public string DescriptionEn { get; set; }
        public string DescriptionAr { get; set; }
        public int RestaurantID { get; set; }
        public bool HasSpecialOffer { get; set; }
        public AqarSquare.Engine.ViewByUsers ViewBy { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> ExpirationDate { get; set; }
        public Nullable<int> EntertainmentOrder { get; set; }
        public Nullable<bool> NightlifeChk { get; set; }
        public Nullable<bool> DiningChk { get; set; }
        public Nullable<bool> BrunchChk { get; set; }
        public Nullable<bool> Sat { get; set; }
        public Nullable<bool> Sun { get; set; }
        public Nullable<bool> Mon { get; set; }
        public Nullable<bool> Tue { get; set; }
        public Nullable<bool> Wed { get; set; }
        public Nullable<bool> Thur { get; set; }
        public Nullable<bool> Fri { get; set; }
        public Nullable<int> LikeCount { get; set; }
        public byte[] Image { get; set; }
        public byte[] ImageData { get; set; }
        public byte[] ImageData1 { get; set; }
        public byte[] ImageData2 { get; set; }
        public byte[] ImageData3 { get; set; }
        public byte[] ImageData4 { get; set; }
        public byte[] ImageData5 { get; set; }
        public byte[] ImageData6 { get; set; }
        public byte[] ImageData7 { get; set; }
        public byte[] ImageData8 { get; set; }
        public byte[] ImageData9 { get; set; }
    
        public virtual RestaurantEntity Restaurant { get; set; }
        public virtual ICollection<EntertainmentReservationEntity> EntertainmentReservations { get; set; }
    }
}
