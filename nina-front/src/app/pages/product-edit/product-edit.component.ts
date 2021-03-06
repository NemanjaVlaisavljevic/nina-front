import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductSize } from 'src/app/enums/ProductSize';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductSizeStock } from 'src/app/models/ProductSizeStock';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterContentChecked  {

  product = new ProductInfo();
  productId : number;
  isEdit = false;
  active = 'general';

  constructor(private toastrService : ToastrService ,
    private productService : ProductService,
    private router : Router,
    private activeRoute : ActivatedRoute) {

    }


  ngOnInit(): void {
    this.productId = +this.activeRoute.snapshot.paramMap.get('id');
    if(this.productId){
      this.isEdit = true;
      this.productService.getProductDetail(this.productId).subscribe(data => {
        this.product = data;
      });
    }
  }

  onCategoryChange(event) {
    if(event.target.value === "0: 0") {
      this.addSizeIfNotExist(ProductSize.S);
      this.addSizeIfNotExist(ProductSize.M);
      this.addSizeIfNotExist(ProductSize.L);
      this.addSizeIfNotExist(ProductSize.XL);
    }
    else {
      this.product.productSizes = [];
    }
  }

  addSizeIfNotExist(size : ProductSize) {
    if(this.product.productSizes.findIndex(x => x.productSize === size) === -1){
      this.product.productSizes.push(new ProductSizeStock(size, 0));
    }
  }

  getSizes() {
    return this.product.productSizes;
  }

  update(){
      if(this.product.categoryType === 0) {
        this.product.productStock = this.product.productSizes.reduce((sum, current) => sum + current.currentSizeStock, 0);
      }

      this.productService.updateProduct(this.product).subscribe(data => {
          if(!data){
            this.toastrService.error('Error while updating product.');
            this.router.navigate(['/admin']);
          }else{
            this.toastrService.success('Successfully updated product');
          }
      },error => {
        console.log(error);
      });
  }

  add(){
    this.productService.createProduct(this.product).subscribe(data => {
      if(!data){
        this.toastrService.error('Error while creating product');
        this.router.navigate(['/admin']);
      }else{
        this.toastrService.success('Successfully created product');
      }
    });
  }

  getProductImages() {
    return this.product?.productIcons;
  }

  onSubmit(){
    if(this.productId){
        this.update();
    }else{
        this.add();
    }
  }

  ngAfterContentChecked(): void {
    console.log(this.product);
  }

}
