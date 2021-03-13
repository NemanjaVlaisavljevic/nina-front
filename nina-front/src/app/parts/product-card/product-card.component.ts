import { Component, OnInit, Input } from '@angular/core';
import { ProductInfo } from 'src/app/models/ProductInfo';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product')
  product: ProductInfo;

  showDetails: boolean = false;
  imageSource: string;
  imageSource1: string;
  imageSource2: string;

  onMouseEnter() {
    this.imageSource = this.imageSource2;
  }

  onMouseLeave() {
    this.imageSource = this.imageSource1;
  }

  constructor() { }

  ngOnInit(): void { 
    this.imageSource1 = this.product.productIcons[0].productIcon;
    this.imageSource2 = this.product.productIcons[1].productIcon;
    this.imageSource = this.imageSource1;
  }
}