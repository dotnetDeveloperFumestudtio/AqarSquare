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
    
    public partial class UserRate
    {
        public int Id { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<int> Rate { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
