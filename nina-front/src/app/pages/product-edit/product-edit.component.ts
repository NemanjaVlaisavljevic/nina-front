import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductInfo } from 'src/app/models/ProductInfo';
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

  update(){
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
