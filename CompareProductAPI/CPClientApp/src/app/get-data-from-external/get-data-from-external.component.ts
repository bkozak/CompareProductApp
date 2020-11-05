import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  url = 'https://www.castorama.pl/api/rest/headless/public/categories/products?searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][0][filters][0][field]=category&searchCriteria[filterGroups][0][filters][0][value]=';
  uri = 'api/Castorama/getFromExternal/';

  constructor(private http: HttpClient) { }

  onClickMe(value: string) {
    this.value = value;
    this.categoryUrl = value;
  
    this.http.get<any>(this.uri + this.categoryUrl).subscribe(data => {
            this.totalAngularPackages = data.total;
        }) 
    }
  

  ngOnInit(): void {
  }

}
