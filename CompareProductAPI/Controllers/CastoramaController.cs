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
            var url = "https://www.castorama.pl/api/rest/headless/public/categories/products?searchCriteria[currentPage]=1&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][0][filters][0][field]=category&searchCriteria[filterGroups][0][filters][0][value]=1942&searchCriteria[sortOrders][0][direction]=desc&searchCriteria[sortOrders][0][field]=promoted&storeId=default";

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
            prod.CategoryId = 1;
            prod.Category = _context.Category.Find(1);
            prod.SKU = 123;
            prod.EAN = 1234;
            prod.Price = 10;
            prod.UnitId = 1;
            prod.Unit = _context.Unit.Find(1);
            prod.UnitPrice = 20;
            prod.CreateDate = DateTime.Now;
            prod.Shop = _context.Shop.Find(1);

            return prod;
        }
    }
}
