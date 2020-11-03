import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: Category[];

  constructor(
    private http: HttpClient) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    var appUrl = environment.appUrl;
    var apiUrl = 'api/categories/';

    this.http.get<Category[]>(appUrl + apiUrl).subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
  }
}
