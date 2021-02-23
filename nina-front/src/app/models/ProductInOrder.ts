import { ProductSize } from "../enums/ProductSize";
import { ProductInfo } from "./ProductInfo";

export class ProductInOrder{
    productId : number;
    productName : string;
    productDescription : string;
    productIcon : string;
    categoryType : number;
    productPrice : number;
    productStock : number;
    count : number;
    productSize : string;

    constructor(productInfo : ProductInfo , quantity = 1 , productSize : number){
      this.productId = productInfo.productId;
      this.productName = productInfo.productName;
      this.productPrice = productInfo.productPrice;
      this.productStock = productInfo.productStock;
      this.productDescription = productInfo.productDescription;;
      this.productIcon = productInfo.productIcon;
      this.categoryType = productInfo.categoryType;
      this.count = quantity;
      this.productSize = ProductSize[productSize];
    }
}
