using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompareProductAPI.Models
{
    public class Root
    {
            public object filters { get; set; }
            public List<CastoramaProduct> items { get; set; }
            public int all { get; set; }
    }
}
