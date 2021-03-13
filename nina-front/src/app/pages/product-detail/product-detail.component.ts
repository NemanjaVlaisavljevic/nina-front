import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductSize } from 'src/app/enums/ProductSize';
import { ProductIcon } from 'src/app/models/ProductIcon';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { ProductSizeStock } from 'src/app/models/ProductSizeStock';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productInfo : ProductInfo;
  count : number;
  productSizeInNumber : number;
  selectedProductSizeStock : ProductSizeStock;
  productSize : number;
  imageSource : string;

  constructor(private productService : ProductService,
    private cartService : CartService,
    private router : Router,
    private activeRoute : ActivatedRoute ,
    private cookieService : CookieService) {
  }


  ngOnInit(): void {
    this.getProduct();
    this.count = 1;
  }

  increaseCount() {
    // CATEGORY IS CLOTHING
    if(this.productInfo.categoryType === 0) {
      if(this.selectedProductSizeStock === undefined) return;
      if(this.count < this.selectedProductSizeStock.currentSizeStock)
        this.count++;
    }
    // CATEGORY IS NOT CLOTHING
    else {
      if(this.count < this.productInfo.productStock)
        this.count++;
    }
  }

  validateIncreaseButton() {
    // CATEGORY IS CLOTHING
    if(this.productInfo.categoryType === 0) {
      if(this.selectedProductSizeStock === undefined) return false;
      return this.count !== this.selectedProductSizeStock.currentSizeStock;
    }
    // CATEGORY IS NOT CLOTHING
    else {
      return this.count !== this.productInfo.productStock;
    }
  }

  validateDecreaseButton() {
    return this.count > 1;
  }

  decreaseCount() {
    if(this.count > 1)
      this.count--;
  }

  onHover(image: ProductIcon) {
    this.imageSource = image.productIcon;
  }

  selectSize(size: string) {
    if(this.selectedProductSizeStock?.productSize !== size) {
      this.selectedProductSizeStock = this.productInfo.productSizes.find(x => x.productSize === size);
      this.count = 1;
    }
  }

  addToCart() : void {
    this.cartService
        .addItem(new ProductInOrder(this.productInfo , this.count , this.selectedProductSizeStock.productSize))
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
      this.productInfo.productSizes = this.sortSizes(this.productInfo.productSizes);
      this.imageSource = this.getFirstImage();
    },
    error => {

    });
  }

  getProductSizes() {
    return this.productInfo.productSizes.filter(x => x.currentSizeStock > 0);
  }

  getProductImages() {
    if(this.productInfo === undefined) return;
    return this.productInfo.productIcons;
  }

  getFirstImage() {
    return this.productInfo.productIcons[0].productIcon;
  }

  sortSizes(sizes: ProductSizeStock[]) {
    var sortedSizes : ProductSizeStock[] = [];
    if(sizes === undefined) return sortedSizes;

    var size = sizes.find(x => x.productSize === ProductSize.S);
    if(size !== undefined)
      sortedSizes.push(size);

    size = sizes.find(x => x.productSize === ProductSize.M);
    if(size !== undefined)
      sortedSizes.push(size);

    size = sizes.find(x => x.productSize === ProductSize.L);
    if(size !== undefined)
      sortedSizes.push(size);

    size = sizes.find(x => x.productSize === ProductSize.XL);
    if(size !== undefined)
      sortedSizes.push(size);

    return sortedSizes;
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
