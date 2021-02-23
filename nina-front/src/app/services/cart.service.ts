import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cart } from '../models/Cart';
import { Item } from '../models/Item';
import { ProductInOrder } from '../models/ProductInOrder';
import { JwtResponse } from '../response/JwtResponse';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl = `http://localhost:8080/api/cart`;
  localMap = {};

  private itemSubject : BehaviorSubject<Item[]>;
  private totalSubject : BehaviorSubject<number>;
  public items : Observable<Item[]>;
  public total : Observable<number>;

  private currentUser : JwtResponse;

  constructor(private httpClient : HttpClient ,
    private toastrService : ToastrService,
    private cookieService : CookieService,
    private userService : UserService) {
      this.itemSubject = new BehaviorSubject<Item[]>(null);
      this.items = this.itemSubject.asObservable();
      this.totalSubject = new BehaviorSubject<number>(null);
      this.total = this.totalSubject.asObservable();
      this.userService.currentUser.subscribe(data => {
        this.currentUser = data;
      });
     }

     private getLocalCart() : ProductInOrder[]{
        if(this.cookieService.check('cart')){
          this.localMap = JSON.parse(this.cookieService.get('cart'));
          return Object.values(this.localMap);
        }else{
          this.localMap = {};
          return [];
        }
     }

     getCart() : Observable<ProductInOrder[]> {
       const localCart = this.getLocalCart();
       if(this.currentUser){
         if(localCart.length > 0){
           return this.httpClient.post<Cart>(this.cartUrl , localCart).pipe(
             tap(data => {
               this.clearLocalStorage();
             }),
             map(data => data.products),
             catchError(error => of([]))
           );
         }else{
           return this.httpClient.get<Cart>(this.cartUrl).pipe(
             map(data => data.products),
             catchError(error => of([]))
           );
         }
       }else{
         return of(localCart);
       }
     }

     addItem(productInOrder) : Observable<boolean> {
        let flag : Boolean;
        let currentPosition : string;
        if(!this.currentUser){
          if(this.cookieService.check('cart')){
            this.localMap = JSON.parse(this.cookieService.get('cart'));
          }
          if(productInOrder.categoryType === 0){
            if(!this.localMap[productInOrder.productId]){
              this.localMap[productInOrder.productId] = productInOrder;
            }
            else{
              for(var key of Object.keys(this.localMap)){
              if(this.localMap[key] && this.localMap[key].productId === productInOrder.productId
                && this.localMap[key].productSize === productInOrder.productSize){
                  this.localMap[key].count += productInOrder.count;
                  flag = true;
                }else{
                  currentPosition = key;
                }
            }
            if(!flag){
              this.localMap[+currentPosition + 1] = productInOrder;
            }
          }
          }else{
            if(!this.localMap[productInOrder.productId]){
              this.localMap[productInOrder.productId] = productInOrder;
            }
            else{
              for(var key of Object.keys(this.localMap)){
              if(this.localMap[key] && this.localMap[key].productId === productInOrder.productId
                && this.localMap[key].productName === productInOrder.productName){
                  this.localMap[key].count += productInOrder.count;
                  flag = true;
                }else{
                  currentPosition = key;
                }
            }
            if(!flag){
              this.localMap[+currentPosition + 1] = productInOrder;
            }
            }
          }
          flag = false;
          this.cookieService.set('cart' , JSON.stringify(this.localMap));
          this.toastrService.success('Successfully added item to cart.');
          return of(true);
        }else{
          const url = `${this.cartUrl}/add`
          return this.httpClient.post<boolean>(url , {
            'quantity' : productInOrder.count,
            'productId' : productInOrder.productId,
            'productSize' : productInOrder.productSize
          }).pipe(tap(data => {
            this.toastrService.success('Successfully added item to cart.');
          }))
          };
        }

     update(productInOrder) : Observable<ProductInOrder>{
       if(this.currentUser){
         const url = `${this.cartUrl}/${productInOrder.productId}`;
         return this.httpClient.put<ProductInOrder>(url , productInOrder.count);
       }
     }

     remove(productInOrder) : Observable<any>{
       if(!this.currentUser){
         if(productInOrder.categoryType === 0){
          for(var key of Object.keys(this.localMap)){
            if(this.localMap[key].productId === productInOrder.productId && this.localMap[key].productSize === productInOrder.productSize){
              delete this.localMap[key];
            }
          };
         }else{
           for(var key of Object.keys(this.localMap)){
             if(this.localMap[key].productId === productInOrder.productId){
               delete this.localMap[key];
             }
           };
         }
         this.toastrService.info('Item removed from cart');
         return of(null);
       }else{
         let url = '';
         if(productInOrder.productSize !== null){
           url = `${this.cartUrl}/${productInOrder.productId}/${productInOrder.productSize}`;
         }else{
          url = `${this.cartUrl}/${productInOrder.productId}`;
         }
         return this.httpClient.delete(url).pipe(tap(data => {
          this.toastrService.info('Item removed from cart');
         }));
       }
     }

     checkout(): Observable<any> {
      const url = `${this.cartUrl}/checkout`;
      return this.httpClient.post(url, null).pipe();
    }


    storeLocalCart() {
        this.cookieService.set('cart', JSON.stringify(this.localMap));
    }

    clearLocalStorage() {
          console.log('clear local cart');
          this.cookieService.delete('cart');
          this.localMap = {};
    }


}
