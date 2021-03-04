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

  constructor() { }

  ngOnInit(): void { }

  getFirstImage() {
    return this.product.productIcons[0].productIcon;
  }

}
