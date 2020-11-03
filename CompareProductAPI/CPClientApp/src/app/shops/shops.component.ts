import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shop } from '../models/shop';
import { environment } from '../../environments/environment';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  public shops: Shop[];

  constructor(
    private http: HttpClient) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    var appUrl = environment.appUrl;
    var apiUrl = 'api/shops/';

    this.http.get<Shop[]>(appUrl + apiUrl).subscribe(result => {
      this.shops = result;
    }, error => console.error(error));
  }
}
