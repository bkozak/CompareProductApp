using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CompareProductAPI.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public int ProductIdFromShop { get; set; }
        public string Name { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public int? EAN { get; set; }
        public int? SKU { get; set; }
        [ForeignKey("Unit")]
        public int UnitId { get; set; }
        public double? Price { get; set; }
        public double? UnitPrice { get; set; }
        public DateTime CreateDate { get; set; }
        [ForeignKey("Shop")]
        public int ShopId { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [Required(AllowEmptyStrings = true)]
        public string Url { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [Required(AllowEmptyStrings = true)]
        public string Image { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [Required(AllowEmptyStrings = true)]
        public string brand { get; set; }


        public virtual Shop Shop { get; set; }
        public virtual Category Category { get; set; }
        public virtual Unit Unit { get; set; }
    }
}
