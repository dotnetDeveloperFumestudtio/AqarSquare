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
    
    public partial class Property
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string TitleAr { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<bool> Approved { get; set; }
        public string Description { get; set; }
        public string DescriptionAr { get; set; }
        public string Address { get; set; }
        public string AddressAr { get; set; }
        public Nullable<int> Price { get; set; }
        public Nullable<int> Discount { get; set; }
        public Nullable<int> DiscountValue { get; set; }
        public Nullable<int> RoomsNo { get; set; }
        public Nullable<int> BathroomNo { get; set; }
        public Nullable<int> Floor { get; set; }
        public string PropertyId { get; set; }
        public Nullable<int> PropertyType { get; set; }
        public Nullable<int> BedroomNo { get; set; }
        public Nullable<int> ReceptionNo { get; set; }
        public Nullable<int> Area { get; set; }
        public Nullable<int> Space { get; set; }
        public Nullable<bool> Lift { get; set; }
        public Nullable<bool> Balacony { get; set; }
        public Nullable<bool> Garden { get; set; }
        public Nullable<bool> Garage { get; set; }
        public Nullable<bool> Pool { get; set; }
        public Nullable<bool> AirCondtion { get; set; }
        public string Currency { get; set; }
        public string CurrencyKey { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ApprovedBy { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
        public string Long { get; set; }
        public string Late { get; set; }
        public Nullable<int> ContractType { get; set; }
        public Nullable<int> UserInCharge { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public Nullable<int> IsAqarContract { get; set; }
        public Nullable<int> IsNotAqarContract { get; set; }
        public Nullable<bool> IsPublished { get; set; }
        public Nullable<System.DateTime> ContractDate { get; set; }
        public Nullable<int> ContactValue { get; set; }
        public string Image { get; set; }
    }
}
