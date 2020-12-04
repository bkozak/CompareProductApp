import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-simulator',
  templateUrl: './app-simulator.component.html',
  styleUrls: ['./app-simulator.component.scss']
})
export class AppSimulatorComponent implements OnInit {

  isVisibleC = false;
  isVisibleB = false;
  isVisiblePC = false;
  categoryId: number;
  allRoot: any;
  allItems: any;
  dateNow = new Date();
  allProducts: any;
  refreshData = false;

  externalUrl = 'https://www.castorama.pl/api/rest/headless/public/categories/products?searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][0][filters][0][field]=category&searchCriteria[filterGroups][0][filters][0][value]=';

  constructor(private http: HttpClient, private productService: ProductService, private router: Router) { }

  clickC() {
    this.isVisibleC = this.isVisibleC != true ? true : false;
    this.isVisibleB = false;
    this.isVisiblePC = false;
    this.categoryId = 1941;
    console.log(this.categoryId);
  }
  clickB() {
    this.isVisibleB = this.isVisibleB != true ? true : false;
    this.isVisibleC = false;
    this.isVisiblePC = false;
    this.categoryId = 1942;
    console.log(this.categoryId);
  }
  clickPC() {
    this.isVisiblePC = this.isVisiblePC != true ? true : false;
    this.isVisibleC = false;
    this.isVisibleB = false;
    this.categoryId = 1943;
    console.log(this.categoryId);
  }

  getSelectedData() {

    this.http.get<any>(this.externalUrl + this.categoryId).subscribe(data => {
      this.allRoot = JSON.stringify(data.items);
      this.allItems = data.items;
      this.updateProducts(this.allItems);
    });
  }

  updateProducts(array) {
    array.forEach(dane => {
      this.productService.saveProduct(
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
          console.log("Sukces");
          this.router.navigate(['/products']);
        }, error => {
          console.log("Failed");
        });
      });
  }

  productExist() {
    var values = this.allItems;

  }

  loadProducts() {
    this.allProducts = this.productService.getProducts();
  }

  saveProduct(product: any) {
    this.productService.saveProduct(product)
      .subscribe((data) => {
        this.router.navigate(['/products']);
      });
  }





  ngOnInit(): void {
  }

}
