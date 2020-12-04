using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
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
    public class GetDataHelperController : ControllerBase
    {
        private readonly ProductContext _context;
        private HttpClient client;

        public GetDataHelperController(ProductContext context)
        {
            _context = context;
            client = new HttpClient();
        }
        // GET api/Castorama/getFromExternal
        [HttpGet("getFromExternal/{id}")]
        public async Task<IActionResult> GetFromExternal(int id)
        {
            //int[] allCategory = { id };
            var uri = String.Format("https://www.obi.pl/c/550");
            var task = Task.Run(() => GetAsyncData(uri + id));
            //var inny = await GetData(uri + id);
            try
            {
                //var result = await Task.WhenAll(task);
                var root = await task;
                foreach (var cProd in root.items)
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }
                    var product = SaveDataASProduct(cProd, id);
                    if (product != null)
                    {
                        _context.Product.Add(product);
                        await _context.SaveChangesAsync();
                    }
                }
            }
            catch
            {
                return Redirect("/shops");
            }

            return new EmptyResult();
        }

        [HttpGet("getobi/{id}")]
        public async Task<IActionResult> GetObi(int id)
        {
            var uri = String.Format("https://www.obi.pl/c/{0}", id);
            var content = await client.GetStringAsync(uri);

            return Ok(content);
        }

        public async Task<List<List<CastoramaProduct>>> GetRootsItem(int[] allCategory)
        {
            var semaphore = new SemaphoreSlim(10, 10);
            var RootList = new List<List<CastoramaProduct>>();
            var url = "https://www.obi.pl/c/550";
            var adress = String.Format("searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][0][filters][0][field]=category&searchCriteria[filterGroups][0][filters][0][value]=");

            try
            {
                foreach (var cat in allCategory)
                {
                    //for(int i = 0; i < 10; i++)
                    //{
                    await semaphore.WaitAsync();
                    var response = await client.GetAsync(url + adress + cat);
                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        var data = JsonConvert.DeserializeObject<Root>(apiResponse);
                        RootList.Add(data.items);
                        //break;
                    }
                    //await Task.Delay(4000, cancellationToken);
                    //}

                }
            }
            finally
            {
                semaphore.Release();
            }

            return RootList;
        }

            private Product SaveDataASProduct(CastoramaProduct castoramaProducts, int categoryId)
        {
            if (_context.Product.Any(x => x.ProductIdFromShop == castoramaProducts.entity_id))
            {
                return null;
            }
            else
            {
                var prod = new Product();
                prod.ProductIdFromShop = castoramaProducts.entity_id;
                prod.Name = castoramaProducts.name;
                prod.Category = _context.Category.FirstOrDefault(x => x.ShopCategoryId == categoryId) ?? 
                    new Category { 
                        ShopCategoryId = categoryId, 
                        Name = castoramaProducts.price_tag_unit,
                        Shop = Shop.Castorama,
                    };
                prod.CategoryId = prod.Category.Id;
                if (int.TryParse(castoramaProducts.sku, out int result))
                    prod.SKU = result;
                prod.EAN = null;
                prod.Price = 10;
                prod.Unit = _context.Unit.FirstOrDefault(x => x.Name == castoramaProducts.price_tag_unit) ?? new Unit { Name = castoramaProducts.price_tag_unit };
                prod.UnitId = prod.Unit.Id;
                prod.UnitPrice = 20;
                prod.CreateDate = DateTime.Now;
                prod.Shop = _context.Shop.Find(Shop.Castorama);
                prod.Image = castoramaProducts.image;
                prod.Url = castoramaProducts.url;
                prod.brand = castoramaProducts.brand == null ? "" : castoramaProducts.brand;

                return prod;
            }
        }

        //private async Task<string> GetData(string url)
        //{
        //    var response = await client.GetAsync(url);
        //    return await response.Content.ReadAsStringAsync();
        //    //return JsonConvert.DeserializeObject<Root>(apiresponse);
        //}

        private async Task<Root> GetAsyncData(string uri)
        {
            var content = await client.GetStringAsync(uri);
            return await Task.Run(() => JsonConvert.DeserializeObject<Root>(content));
        }
    }
}
