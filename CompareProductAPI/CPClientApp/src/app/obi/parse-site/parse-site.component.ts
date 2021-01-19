import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, first, retry, tap, map } from 'rxjs/operators';
import { Observable, throwError, pipe } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
//import $ from "jquery";


@Component({
  selector: 'app-parse-site',
  templateUrl: './parse-site.component.html',
  styleUrls: ['./parse-site.component.scss']
})
export class ParseSiteComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html',
    })
  };
  
  categoryId: number;
  page: string;
  product: any;
  name: string;
  imageUrl: string;
  url: string;
  sku: string;
  price: string;

  constructor(private http: HttpClient, private productService: ProductService) {
    this.categoryId = 550;
   }

  getData() {
    this.http.get('api/GetDataHelper/getobi/' + this.categoryId, { observe: 'body', responseType: 'text' })
      .pipe(
        first()
      )
      .subscribe(
        data => {
          this.getProductsFromPage(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  getProductsFromPage(page: string) {
    var html = $(page);
    var products = html.find('li.product.large');
    var images = products.find('img.image');
    var titles = products.find('.description');
    var infos = products.find('.info-container');
    var prices = products.find('span.price');
    var urls = products.find('a.product-wrapper');
    //console.log("produkty", products);

    for (var i = 0; i < products.length; i++) {
      var imageElement = images.eq(i);
      var obiCode = infos.eq(i).find("input[name='code']").val();
      var imageUrl = imageElement.attr('src').valueOf();
      var mapImageUrl = imageElement.attr('data-src');
      this.price = prices.eq(i).text();
      console.log("cenaprzed", this.price);
      console.log("cena", this.priceNormalizer(this.price));
      this.url = 'https://www.obi.pl' + urls.eq(i).prop('pathname');
      
      if(obiCode){
        this.sku = obiCode.toString();
      }

      this.product = 
      {
           "productIdFromShop": this.sku,
           "name": titles.eq(i).text(),
           "categoryId": this.categoryId,
           "categoryName": "test",
           "ean": 0,
           "sku": this.sku,
           "unitId": 2,
           "unitName": "sztuka",
           "unitPrice": 20.0,
           "price": this.priceNormalizer(this.price),
           "createDate": new Date(),
           "shopId": 2,
           "shopName": "OBI",
           "url": this.url,
           "image": (!mapImageUrl) ? imageUrl : mapImageUrl,
           "brand": ""
      };
      console.log("GotowyProdukt", this.product);
      this.postData(this.product);
    }
  }

  priceNormalizer(price) {
    var priceNumbers = price.match(/\d+/g);

    if(priceNumbers) {
      var resultPrice = parseFloat(priceNumbers.join('.'));
      return resultPrice;
    }

    return 0; 
  }

  postData(item) {
    this.productService.saveProduct(item)
    .subscribe(
      () => {
        console.log("Success");
      },
      error => {
        console.error("Błąd", error);
      }
    );
  }

  ngOnInit(): void {
    this.getData();
  }
}
