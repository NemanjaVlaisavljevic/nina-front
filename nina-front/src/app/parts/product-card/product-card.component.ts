import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ProductInfo } from 'src/app/models/ProductInfo';

declare var $: any;

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product')
  product: ProductInfo;

  showDetails: boolean = false;

  constructor() { 
    console.log(this.product)
  }

  ngOnInit(): void {
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.showDetails = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.showDetails = false;
  }

}
