using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CompareProductAPI.Models
{
    public class Shop
    {
        public const int Castorama = 1;
        public const int OBI = 2;
        public const int LeroyMerlin = 3;

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual List<Product> Products { get; set; }
    }
}
