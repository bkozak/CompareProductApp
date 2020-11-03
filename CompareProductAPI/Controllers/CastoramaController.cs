using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
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
            var categ = "1942";
            var url = "https://www.castorama.pl/api/rest/headless/public/categories/products?";
            var adress = String.Format("searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][0][filters][0][field]=category&searchCriteria[filterGroups][0][filters][0][value]={0}", categ);

            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(url + adress))
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
                        if(product != null)
                        {
                            _context.Product.Add(product);
                            await _context.SaveChangesAsync();
                        }
                    }
                }
            }
            return Ok();
        }

        private Product SaveDataASProduct(CastoramaProduct castoramaProducts)
        {
            if(_context.Product.Any(x => x.ProductIdFromShop == castoramaProducts.entity_id))
            {
                return null;
            }else
            {
                var prod = new Product();
                prod.ProductIdFromShop = castoramaProducts.entity_id;
                prod.Name = castoramaProducts.name;
                prod.CategoryId = 1;
                prod.Category = _context.Category.Find(1);
                if (int.TryParse(castoramaProducts.sku, out int result))
                    prod.SKU = result;
                prod.EAN = null;
                prod.Price = 10;
                prod.UnitId = 1;
                prod.Unit = _context.Unit.FirstOrDefault(x => x.Name == castoramaProducts.price_tag_unit) ?? new Unit { Name = castoramaProducts.price_tag_unit };
                prod.UnitPrice = 20;
                prod.CreateDate = DateTime.Now;
                prod.Shop = _context.Shop.Find(1);
                prod.Image = castoramaProducts.image;
                prod.Url = castoramaProducts.url;
                prod.brand = castoramaProducts.brand == null ? "" : castoramaProducts.brand;

                return prod;
            }
        }
    }
}
