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
    
    public partial class EntertainmentWorkingHourEntity
    {
        public int Id { get; set; }
        public Nullable<int> RestuarantId { get; set; }
        public Nullable<int> Day { get; set; }
        public Nullable<System.DateTime> FromTime { get; set; }
        public Nullable<System.DateTime> ToTime { get; set; }
        public Nullable<bool> Override { get; set; }
        public Nullable<int> EntertainmentId { get; set; }
    }
}