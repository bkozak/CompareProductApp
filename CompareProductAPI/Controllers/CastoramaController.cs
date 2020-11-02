using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CompareProductAPI.Data;
using CompareProductAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CompareProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CastoramaController : ControllerBase
    {
        private readonly ProductContext _context;

        public CastoramaController(ProductContext context)
        {
            _context = context;
        }
        // GET api/Castorama/getFromExternal
        [HttpGet, Route("getFromExternal")]
        public async Task<IActionResult> GetFromExternal()
        {
            var url = "https://www.castorama.pl/api/rest/headless/public/categories/products?searchCriteria[currentPage]=1&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][0][filters][0][field]=category&searchCriteria[filterGroups][0][filters][0][value]=1941&searchCriteria[sortOrders][0][direction]=desc&storeId=default";

            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(url))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    var data = JsonConvert.DeserializeObject<Root>(apiResponse);
                    
                    foreach(var cProd in data.items)
                    {
                        if (!ModelState.IsValid)
                        {
                            return BadRequest(ModelState);
                        }
                        var product = SaveDataASProduct(cProd);
                        _context.Product.Add(product);
                        await _context.SaveChangesAsync();

                        
                    }
                }
            }
            return Ok();
        }

        private Product SaveDataASProduct(CastoramaProduct castoramaProducts)
        {
            var prod = new Product();
            prod.Name = castoramaProducts.name;
            prod.SKU = int.Parse(castoramaProducts.sku);
            prod.EAN = 1234;
            prod.Price = 10;
            prod.UnitPrice = 20;
            prod.CreateDate = DateTime.Now;

            return prod;
        }
    }
}
