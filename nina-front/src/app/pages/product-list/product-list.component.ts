import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CategoryType } from 'src/app/enums/CategoryType';
import { ProductStatus } from 'src/app/enums/ProductStatus';
import { UserRole } from 'src/app/enums/UserRole';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy {

  CategoryType : CategoryType;
  page : any;
  currentUser : JwtResponse;
  ProductStatus = ProductStatus;
  Role = UserRole;

  private querySub : Subscription;

  constructor(private userService : UserService ,
    private productService : ProductService,
    private toastrService : ToastrService,
    private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUserValue;
    this.querySub = this.activeRoute.queryParams.subscribe(data => {
        this.update();
    });
  }

  ngOnDestroy() : void {
    this.querySub.unsubscribe();
  }

  update() : void{
    let pageNumber = 1;
    let pageSize = 5;
    if(this.activeRoute.snapshot.queryParamMap.get('page')){
      pageNumber = +this.activeRoute.snapshot.queryParamMap.get('page');
      pageSize = +this.activeRoute.snapshot.queryParamMap.get('size');
      this.getAllProducts(pageNumber , pageSize);
    }else{
      this.getAllProducts();
    }
  }

  getAllProducts(page : number = 1 , size : number = 5){
    return this.productService.getAllInPage(+page , +size).subscribe(data => {
      this.page = data;
    });
  }

  deleteProduct(productInfos : ProductInfo[] , product : ProductInfo) {
    this.productService.deleteProduct(product).subscribe(data => {
      productInfos = productInfos.filter(productInfo =>
        productInfo.productId != product.productId);
        this.toastrService.success('Successfully deleted product from the list');
    },
    error => {
      this.toastrService.error('Error while deleting product from list of products');
    });
  }

}
