import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = `http://localhost:8080/api/order`;

  constructor(private httpClient : HttpClient) {

   }

   getOrdersInPage(page = 1 , size = 10) : Observable<any> {
     const url = `${this.orderUrl}/all?page=${page}&size=${size}`;
     return this.httpClient.get(url);
   }

   showOneOrder(id : number) : Observable<Order>{
     const url = `${this.orderUrl}/${id}`;
     return this.httpClient.get<Order>(url).pipe(
       catchError(data =>
         of(null)));
   }

   cancelOrder(id : number) : Observable<Order>{
    const url = `${this.orderUrl}/cancel/${id}`;
    return this.httpClient.patch<Order>(url, null).pipe(
    catchError(_ => of(null)));
   }

   finishOrder(id : number) : Observable<Order>{
     const url = `${this.orderUrl}/finish/${id}`;
     return this.httpClient.patch<Order>(url , null).pipe(
       catchError(data => of(null)));
   }

}
