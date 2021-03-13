import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
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

  selectedProduct : ProductInfo;
  pageNum: number = 1;
  pageMax: number = 1;
  sizeNum: number = 5;
  products : any;
  pageProducts : ProductInfo[];

  private querySub : Subscription;

  constructor(private userService : UserService , private modalService: NgbModal, config: NgbModalConfig,
    private productService : ProductService,
    private toastrService : ToastrService,
    private activeRoute : ActivatedRoute) { 
      	config.backdrop = 'static';
		config.keyboard = false;
    }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUserValue;
    this.querySub = this.activeRoute.queryParams.subscribe(data => {
		if(this.activeRoute.snapshot.queryParamMap.get('page')) {
			this.pageNum = +this.activeRoute.snapshot.queryParamMap.get('page');
			this.sizeNum = +this.activeRoute.snapshot.queryParamMap.get('size');
		}
        this.getProducts();
    });
  }

  ngOnDestroy() : void {
    this.querySub.unsubscribe();
  }

  showModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  	onRemoveOk(productInfos : ProductInfo[]) {
		if(this.selectedProduct !== undefined){
			this.deleteProduct(productInfos, this.selectedProduct);
    	}
	}

	nextPage() {
		if(this.pageNum !== this.pageMax) {
			this.pageNum++;
			this.getPageProducts(this.pageNum, this.sizeNum);
		}
	}

	previousPage() {
		if(this.pageNum !== 1) {
			this.pageNum--;
			this.getPageProducts(this.pageNum, this.sizeNum);
		}
	}

	changePage(page: number) {
		this.pageNum = page;
		this.getPageProducts(this.pageNum, this.sizeNum);
	}

	counter(i = 1) {
		return new Array(i);
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

  	getPageProducts(page: number, size: number) {
		if(this.products !== undefined) {
			if(page === 1) {
				this.pageProducts = this.products.content.slice(0, size);
			}
			else {
				const startIndex = ((page - 1)*size);
				this.pageProducts = this.products.content.slice(startIndex, startIndex + size);
			}
		}
  	}

	getProducts() {
		this.productService.getAllInPage(1, 100).subscribe(data => {
			this.products = data;
			this.pageMax = Math.ceil(this.products.totalElements / this.sizeNum);
			this.getPageProducts(this.pageNum, this.sizeNum);
		});
	}

  getAllProducts(page : number = 1 , size : number = 5){
    return this.productService.getAllInPage(+page , +size).subscribe(data => {
      this.page = data;
    });
  }

	deleteProduct(productInfos : ProductInfo[] , product : ProductInfo) {
		const index = this.products.content.indexOf(product);
		if(index != -1) {
			this.productService.deleteProduct(product).subscribe(data => {
				this.products.content.splice(index, 1);	
				this.getPageProducts(this.pageNum, this.sizeNum)
				this.toastrService.success('Successfully deleted product from the list');
			},
			error => {
				this.toastrService.error('Error while deleting product from list of products');
			});
		}
  	}

}
