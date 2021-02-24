import { Component, OnInit, Input } from '@angular/core';
import { ProductInfo } from 'src/app/models/ProductInfo';

@Component({
  selector: 'app-product-card-deck',
  templateUrl: './product-card-deck.component.html',
  styleUrls: ['./product-card-deck.component.css']
})
export class ProductCardDeckComponent implements OnInit {

  @Input('products')
  products: ProductInfo[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
