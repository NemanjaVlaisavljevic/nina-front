import { ProductSize } from "../enums/ProductSize";

export class ProductSizeStock{
  productSize : ProductSize;
  currentSizeStock : number;

  constructor(productSize : ProductSize , currentSizeStock : number){
    this.productSize = productSize;
    this.currentSizeStock = currentSizeStock;
  }
}
