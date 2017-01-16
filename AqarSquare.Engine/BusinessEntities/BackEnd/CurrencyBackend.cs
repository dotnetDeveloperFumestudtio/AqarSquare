
using System;

namespace AqarSquare.Engine.BusinessEntities.BackEnd
{

  public class CurrencyBackend
		{
			public int Id { get; set; }
      public string CurrencyKey { get; set; }
      public string Currency { get; set; }
			public bool? Status { get; set; }
			public DateTime? CreatedDate { get; set; }
			public int? CreatedBy { get; set; }


      public string CreatedByUserName { get; set; }
    }
	}