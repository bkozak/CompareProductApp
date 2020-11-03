using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompareProductAPI.Data
{
    public class ProductDTO
    {
        public ProductDTO()
        {

        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int EAN { get; set; }
        public int SKU { get; set; }
        public int UnitId { get; set; }
        public string UnitName { get; set; }
        public double Price { get; set; }
        public double UnitPrice { get; set; }
        public DateTime CreateDate { get; set; }
        public int ShopId { get; set; }
        public string ShopName { get; set; }
    }
}
