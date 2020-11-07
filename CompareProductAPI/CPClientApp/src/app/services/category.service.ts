import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/categories/';
   }


getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

getCategory(id: number): Observable<Category> {
 return this.http.get<Category>(this.myAppUrl + this.myApiUrl + id)
   .pipe(
     retry(1),
     catchError(this.errorHandler)
   );
}

saveCategory(item): Observable<Category> {
  item.shop = item.shopId;
 return this.http.post<Category>(this.myAppUrl + this.myApiUrl, JSON.stringify(item), this.httpOptions)
   .pipe(
     retry(1),
     catchError(this.errorHandler)
   );
}

updateCategory(id: number, item): Observable<Category> {
 return this.http.put<Category>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(item), this.httpOptions)
   .pipe(
     retry(1),
     catchError(this.errorHandler)
   );
}

deleteCategory(id: number): Observable<Category> {
 return this.http.delete<Category>(this.myAppUrl + this.myApiUrl + id)
   .pipe(
     retry(1),
     catchError(this.errorHandler)
   );
}

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
