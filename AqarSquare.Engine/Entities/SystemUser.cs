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
    
    public partial class SystemUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string PhoneNo1 { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<bool> Online { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> UserType { get; set; }
    }
}
