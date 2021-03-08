import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductSize } from 'src/app/enums/ProductSize';
import { ProductIcon } from 'src/app/models/ProductIcon';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductSizeStock } from 'src/app/models/ProductSizeStock';
import { ProductService } from 'src/app/services/product.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterContentChecked {
	product = new ProductInfo();
	productId : number;
	isEdit = false;
	active = 'general';
  	selectedImage: ProductIcon;

	constructor(private toastrService: ToastrService, private modalService: NgbModal, config: NgbModalConfig, private productService: ProductService,
		private router: Router, private activeRoute: ActivatedRoute) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

	ngOnInit(): void {
		this.productId = +this.activeRoute.snapshot.paramMap.get('id');
		if(this.productId) {
		  	this.isEdit = true;
		  	this.productService.getProductDetail(this.productId).subscribe(data => {
				this.product = data;
		  	});
		}
	}

	ngAfterContentChecked(): void {}

	onSubmit() {
		if(this.productId) {
			this.update();
		}
		else {
			this.add();
		}
	}

	onEditSubmit(event: any) {
		if(this.selectedImage !== undefined) {
      		if(event.target.imageUrlEdit.value === "") {
				this.removeImage(this.selectedImage);
      		}
			else {
				this.selectedImage.productIcon = event.target.imageUrlEdit.value;
			}
			this.changeImageOrder();
    	}
  	}

	onAddSubmit(event: any) {
		var value: string = event.target.imageUrlAdd.value;
		if(value !== "" && (value.startsWith("http") || value.startsWith("https")) && this.product.productIcons.findIndex(x => x.productIcon === value) === -1) {
			this.product.productIcons.push(new ProductIcon(value , this.product.productIcons[this.product.productIcons.length - 1].iconOrder + 1));
			this.changeImageOrder();
		}
	}

	onRemoveOk() {
		this.removeImage(this.selectedImage);
		this.changeImageOrder();
	}

	changeImageOrder() {
		this.product.productIcons.forEach((productIcon, index) => {
			productIcon.iconOrder = index + 1;
		});
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.product.productIcons, event.previousIndex, event.currentIndex);
		this.changeImageOrder();
	}

    showModal(content: any) {
      	this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

	removeImage(image: ProductIcon) {
		if(image !== undefined) {
			const index = this.product.productIcons.findIndex(x => x.iconOrder === image.iconOrder);
			if(index > -1) {
				this.product.productIcons.splice(index, 1);
			}
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

	getProductImages() {
		return this.product?.productIcons;
	}

	update() {
		if(this.product.categoryType === 0) {
			this.product.productStock = this.product.productSizes.reduce((sum, current) => sum + current.currentSizeStock, 0);
		}

		this.productService.updateProduct(this.product).subscribe(data => {
			if(!data) {
				this.toastrService.error('Error while updating product.');
				this.router.navigate(['/admin']);
			}
			else {
				this.toastrService.success('Successfully updated product');
			}
		},
		error => {
			console.log(error);
		});
	}

	add() {
		this.productService.createProduct(this.product).subscribe(data => {
			if(!data) {
				this.toastrService.error('Error while creating product');
				this.router.navigate(['/admin']);
			}
			else {
				this.toastrService.success('Successfully created product');
			}
		});
	}
}