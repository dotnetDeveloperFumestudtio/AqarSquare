using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AqarSquare.Engine
{
  public enum Languages
  {
    English = 0,
    Arabic = 1
  }
  public enum ImageCategory
  {
    Balacony = 1,
    Bathroom = 2,
    Reception = 3,
    Garden = 4,
    Pool = 5,
    Bedroom = 6
  }
  public enum PropertyContractStatus
  {
    Pending = 0,
    SoldByAqar = 1,
    Sold = 2
  }
  public enum UserTypes
  {
    Admin = 1,
    Tenant = 2
  }
  public enum Devices
  {
    Android = 0,
    iOS = 1,
    Other = 100
  }

  public enum ViewByUsers
  {
    AllUsers = 0,
    TenantsAndAdmins = 1,
    AdminsOnly = 2
  }

  public enum IntegrationTypes
  {
    Email = 0,
    Integration = 1
  }

  public enum Gender
  {
    Male = 0,
    Female = 1
  }
  public enum Days
  {
    Saturday = 6,
    Sunday = 7,
    Monday = 1,
    Tusday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5

  }
}
