import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductInfo } from '../models/ProductInfo';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = `http://localhost:8080/api/product`;
  private categoryUrl = `http://localhost:8080/api/category`;
  private productAdminUrl = `http://localhost:8080/api/admin/product`

  constructor(private httpClient : HttpClient) {

   }

   getAllInPage(page : number , size : number) : Observable<ProductInfo[]>{
     const url = `${this.productUrl}?page=${page}&size=${size}`;
      return this.httpClient.get<ProductInfo[]>(url).pipe(
        tap(data => {
          console.log(data);
        })
      );
   }

   getProductsInCategory(categoryType : number , page: number, size: number) : Observable<any> {
      const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
      return this.httpClient.get(url).pipe(
        tap(data => {
          console.log(data);
        })
      );
   }

   getProductDetail(productId : number) : Observable<ProductInfo>{
      const url = `${this.productUrl}/${productId}`;
      return this.httpClient.get<ProductInfo>(url).pipe(
        catchError(error => {
          console.log('Couldnt get product details.');
          return of(new ProductInfo());
        })
      );
   }

   createProduct(productInfo : ProductInfo) : Observable<ProductInfo>{
     const url = `${this.productAdminUrl}/new`;
     return this.httpClient.post<ProductInfo>(url , productInfo)
     .pipe(tap(data => {
       console.log('Succesfully created product!');
     }));
   }

   updateProduct(productInfo : ProductInfo) : Observable<ProductInfo> {
     const url = `${this.productAdminUrl}/${productInfo.productId}/edit`;
     return this.httpClient.put<ProductInfo>(url , productInfo)
     .pipe(tap(data => {
       console.log('Succesfully updated product!');
     }));
   }

   deleteProduct(productInfo : ProductInfo) : Observable<any> {
     const url = `${this.productAdminUrl}/${productInfo.productId}/delete`;
     return this.httpClient.delete(url);
   }

   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

        console.error(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
  }

}
