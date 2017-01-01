using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using AqarSquare.Engine.Entities;

namespace AqarSquare.Engine.BusinessEntities
{
  public class Item : BusinessEntityBase
  {
    #region Constructor(s)
    public Item()
      : base()
    {
    }

    public Item(ItemEntity entity, HeaderData header)
      : base(header)
    {
      Convert<ItemEntity>(entity);
    }
    #endregion

    #region Properties
    public int ItemId { get; set; }
     
    [Required]
    [StringLength(300)]
    [IgnoreDataMember]
    [Display(Name = "Item Title English")]
    public string ItemTitleEn { get; set; }

     
    [Required]
    [StringLength(300)]
    [IgnoreDataMember]
    [Display(Name = "Item Title Arabic")]
    public string ItemTitleAr { get; set; }

    public string ImageUrl { get; set; }
  //  public RestaurantCategory CategoryRestaurant { get; set; }


    [IgnoreDataMember]
    public int RestaurantCategoryID { get; set; }
     
    [Required]
    [StringLength(300)]
    [IgnoreDataMember]
    [Display(Name = "Description Arabic")] 
    public string DescriptionAr { get; set; }

    [Required]
    [StringLength(300)]
    [IgnoreDataMember]
    [Display(Name = "Description English")]
    public string DescriptionEn { get; set; }

    public int Price { get; set; }

    public int Quantity { get; set; }
    public int OrderBy { get; set; }

    [IgnoreDataMember]
    public bool Status { get; set; }

    [IgnoreDataMember]
    public DateTime CreationDate { get; set; }    
    public string Title
    {
      get
      {
        if (Header.CurrentLanguage == Languages.Arabic)
          return ItemTitleAr;
        else
          return ItemTitleEn;
      }
      set
      {
        if (Header.CurrentLanguage == Languages.Arabic)
          ItemTitleAr = value;
        else
          ItemTitleEn = value;
      }
    }

    public string Description
    {
      get
      {
        if (Header.CurrentLanguage == Languages.Arabic)
          return DescriptionAr;
        else
          return DescriptionEn;
      }
      set
      {
        if (Header.CurrentLanguage == Languages.Arabic)
          DescriptionAr = value;
        else
          DescriptionEn = value;
      }
    }

    [Display(Name = "Image")]
    [Required]
    [Microsoft.Web.Mvc.FileExtensions(Extensions = "JPG, GIF, PNG",
         ErrorMessage = "Specify a JPG, GIF, or PNG file.")]
    [IgnoreDataMember]
    public HttpPostedFileBase ImageFile { get; set; }


    [Microsoft.Web.Mvc.FileExtensions(Extensions = "JPG, GIF, PNG",
         ErrorMessage = "Specify a JPG, GIF, or PNG file.")]
    [Display(Name = "Image")]
    [IgnoreDataMember]
    public HttpPostedFileBase ImageFileEdit { get; set; }

    #endregion
  }
}
