import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/products/';
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getProduct(id: number): Observable<Product> {
   return this.http.get<Product>(this.myAppUrl + this.myApiUrl + id)
     .pipe(
       retry(1),
       catchError(this.errorHandler)
     );
  }

  saveProduct(item): Observable<Product> {
   return this.http.post<Product>(this.myAppUrl + this.myApiUrl, JSON.stringify(item), this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.errorHandler)
     );
  }

  updateProduct(id: number, item): Observable<Product> {
   return this.http.put<Product>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(item), this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.errorHandler)
     );
  }

  deleteProduct(id: number): Observable<Product> {
   return this.http.delete<Product>(this.myAppUrl + this.myApiUrl + id)
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
