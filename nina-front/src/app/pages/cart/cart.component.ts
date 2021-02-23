import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { UserRole } from 'src/app/enums/UserRole';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit  , OnDestroy , AfterContentChecked{

  productInOrders = [];
  total = 0;
  currentUser : JwtResponse;
  userSubscription : Subscription;

  private updateTerms = new Subject<ProductInOrder>();
  sub: Subscription;

  constructor(private cartService : CartService ,
    private userService : UserService,
    private router : Router) {
        this.userSubscription = this.userService.currentUser.subscribe(data => {
          this.currentUser = data;
        });
     }

  static validateCount(productInOrder){
    const max = productInOrder.productStock;
    if(productInOrder.count > max){
      productInOrder.count = max;
    }else if(productInOrder.count <= 0){
      productInOrder.count = 1;
    }
    console.log(productInOrder.count);
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.productInOrders = data;
    });
    this.sub = this.updateTerms.pipe(

      debounceTime(300),

      switchMap((productInOrder: ProductInOrder) => this.cartService.update(productInOrder))
  ).subscribe(prod => {
          if (!prod) { throw new Error(); }
      },
      _ => console.log('Update Item Failed'));
  }

  ngOnDestroy(): void {
    if(!this.currentUser){
      this.cartService.storeLocalCart();
    }
    this.userSubscription.unsubscribe();

  }
  ngAfterContentChecked(): void {
    this.total = this.productInOrders.reduce(
      (prev, cur) => prev + cur.count * cur.productPrice, 0);
  }

  addOne(productInOrder){
      productInOrder.count++;
      CartComponent.validateCount(productInOrder);
      if(this.currentUser){
        this.updateTerms.next(productInOrder);
      }
  }

  minusOne(productInOrder){
    productInOrder.count--;
    CartComponent.validateCount(productInOrder);
    if (this.currentUser) {
      this.updateTerms.next(productInOrder);
    }
  }

  onChange(productInOrder){
    CartComponent.validateCount(productInOrder);
    if (this.currentUser) {
      this.updateTerms.next(productInOrder);
     }
  }

  remove(productInOrder : ProductInOrder){
      this.cartService.remove(productInOrder).subscribe(data => {
          this.productInOrders = this.productInOrders.filter(product => (product.productId !== productInOrder.productId)
          || (product.productId === productInOrder.productId && product.productSize !== productInOrder.productSize));
          console.log('Cart: ' + this.productInOrders);
      },error =>{
        console.log('Removing an item from cart failed.');
      })
  }

  checkout(){
      if(!this.currentUser){
        this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
      }else if(this.currentUser.role !== UserRole.USER){
        this.router.navigate(['/admin']);
      }else{
        if(confirm('Are you sure you want to place this order?')){
        this.cartService.checkout().subscribe(
          _ => {
              this.productInOrders = [];
          },
          error1 => {
              console.log('Checkout Cart Failed');
          });
         this.router.navigate(['/']);
        }
      }
  }

}
