import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { CastoramaProduct } from '../models/castorama-product';


@Component({
  selector: 'app-get-data-from-external',
  templateUrl: './get-data-from-external.component.html',
  styleUrls: ['./get-data-from-external.component.scss']
})
export class GetDataFromExternalComponent implements OnInit {
  categoryUrl = '';
  clickMessage = '';
  value = '';
  totalAngularPackages;
  objectArray;
  categoryId = 2003;
  dateNow = new Date();
  url = 'https://www.castorama.pl/api/rest/headless/public/categories/products?searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][0][filters][0][field]=category&searchCriteria[filterGroups][0][filters][0][value]=';
  uri = 'api/Castorama/getFromExternal/';

  constructor(private http: HttpClient) { }

  onClickMe(value: string) {
    this.value = value;
    this.categoryUrl = value;
  
    this.http.get<any>(this.url + this.categoryUrl).subscribe(data => {
            this.totalAngularPackages = JSON.stringify(data.items);
            this.objectArray = data.items;
            this.postData(this.objectArray);
        });
      }

    postData(array) {
      //console.log("Dane", dane);
      console.log(this.objectArray);
      console.log(this.value);
array.forEach(dane => {
  this.http.post<Product>('api/Products',
    {
        "productIdFromShop": dane.entity_id,
        "name": dane.name,
        "categoryId": this.categoryId,
        "categoryName": "test",
        "ean": 0,
        "sku": dane.sku,
        "unitId": 2,
        "unitName": dane.price_tag_unit,
        "unitPrice": 20.0,
        "price": 10.0,
        "createDate": this.dateNow,
        "shopId": 1,
        "shopName": "Castorama",
        "url": dane.url,
        "image": dane.image,
        "brand": (dane.brand) ? dane.brand : ""
    }).subscribe(data => {
      console.log("Sukces", data);
    }, error => {
      console.log("Failed");
    });
});
    
  }
  

  ngOnInit(): void {
  }

}
