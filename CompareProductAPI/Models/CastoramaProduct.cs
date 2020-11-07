using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CompareProductAPI.Models
{
    public class CastoramaProduct
    {
        [Key]
        public int entity_id { get; set; }
        public string sku { get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public string small_image { get; set; }
        public string type { get; set; }
        public int stock { get; set; }
        public bool promo_status { get; set; }
        public int available { get; set; }
        public DateTime? availability_date { get; set; }
        public bool free_delivery { get; set; }
        public string price_tag_unit { get; set; }
        public string label_product_catalog { get; set; }
        public string label_product_date_from { get; set; }
        public string label_product_date_to { get; set; }
        public string url { get; set; }
        public bool only_in_store { get; set; }
        public bool not_saleable_separately { get; set; }
        public string brand { get; set; }

    }
}
