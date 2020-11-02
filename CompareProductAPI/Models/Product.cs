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
        public string Name { get; set; }
        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
        public int EAN { get; set; }
        public int SKU { get; set; }
        [ForeignKey("UnitId")]
        public Unit Unit { get; set; }
        public double Price { get; set; }
        public double UnitPrice { get; set; }
        public DateTime CreateDate { get; set; }
        [ForeignKey("ShopId")]
        public Shop Shop { get; set; }
    }
}
