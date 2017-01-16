using System.Text.RegularExpressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using System.Data;

namespace AqarSquares
{

	public class ImageBalacony
		{
			public int Id { get; set; }
			public int PropertyId { get; set; }
			public string Image { get; set; }
			public string CreatedDate { get; set; }
			public int CreatedBy { get; set; }
		  
		}
	}