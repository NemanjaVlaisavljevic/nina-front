import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductSize } from 'src/app/enums/ProductSize';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  title : string;
  productInfo : ProductInfo;
  count : number;
  productSizeInNumber : number;
  productSize : number;

  constructor(private productService : ProductService,
    private cartService : CartService,
    private router : Router,
    private activeRoute : ActivatedRoute ,
    private cookieService : CookieService) {
  }


  ngOnInit(): void {
    this.getProduct();
    this.count = 1;
    this.title = 'Product Details';

  }

  increaseCount() {
    const max = this.productInfo.productStock;
    if(this.count < max)
      this.count++;
  }

  decreaseCount() {
    if(this.count > 1)
      this.count--;
  }

  addToCart() : void {
    console.log('Current size of item added : ' + this.productSizeInNumber);
    this.productSize = this.productSizeInNumber;
    this.cartService
        .addItem(new ProductInOrder(this.productInfo , this.count , this.productSize))
        .subscribe(res => {
          if (!res) {
            console.log('Add Cart failed' + res);
            throw new Error();
          }
          this.router.navigateByUrl('/cart');
        },
        _ => console.log('Add Cart Failed')
    );
  }

  getProduct() : void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.productService.getProductDetail(+id).subscribe(data => {
      this.productInfo = data;
    },error => {
      console.log('Couldnt get product');
    });
  }

  validateCount() : void {
    console.log('Validating');
    const max = this.productInfo.productStock;
    if(this.count > max){
      this.count = max;
    }else if(this.count < 1){
      this.count = 1;
    };
  }

}
