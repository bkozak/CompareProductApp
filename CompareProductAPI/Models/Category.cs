using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CompareProductAPI.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public int ShopCategoryId { get; set; }
        public string Name { get; set; }
        public int Shop { get; set; }

        public virtual List<Product> Products { get; set; }
    }
}
