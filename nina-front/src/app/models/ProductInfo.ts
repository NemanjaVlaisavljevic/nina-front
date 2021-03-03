import { logging } from "protractor";
import { ProductInOrder } from "./ProductInOrder";
import { ProductSizeStock } from "./ProductSizeStock";

export class ProductInfo{
  productId : number;
  productName : string;
  productPrice : number;
  productStock : number;
  productDescription : string;
  productIcon : string;
  productStatus : number;
  categoryType : number;
  createTime: string;
  updateTime: string;
  productSizes : ProductSizeStock[];

  constructor(productInOrder? : ProductInOrder){
      if(productInOrder){
        this.productId = productInOrder.productId;
        this.productName = productInOrder.productName;
        this.productPrice = productInOrder.productPrice;
        this.productStock = productInOrder.productStock;
        this.productDescription = productInOrder.productDescription;
        this.productIcon = productInOrder.productIcon;
        this.categoryType = productInOrder.categoryType;
        this.productStatus = 0;
      }else{
            this.productId = null;
            this.productName = '';
            this.productPrice = 20;
            this.productStock = 100;
            this.productDescription = '';
            this.productIcon = '';
            this.categoryType = 0;
            this.productStatus = 0;
      }
  }
}
