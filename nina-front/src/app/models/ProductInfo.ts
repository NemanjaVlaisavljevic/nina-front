import { logging } from "protractor";
import { ProductSize } from "../enums/ProductSize";
import { ProductIcon } from "./ProductIcon";
import { ProductInOrder } from "./ProductInOrder";
import { ProductSizeStock } from "./ProductSizeStock";

export class ProductInfo{
  productId : number;
  productName : string;
  productPrice : number;
  productStock : number;
  productDescription : string;
  productIcons : ProductIcon[];
  productStatus : number;
  categoryType : number;
  createTime: string;
  updateTime: string;
  productSizes : ProductSizeStock[];
  sold : number;

  constructor(productInOrder? : ProductInOrder){
      if(productInOrder){
        this.productId = productInOrder.productId;
        this.productName = productInOrder.productName;
        this.productPrice = productInOrder.productPrice;
        this.productStock = productInOrder.productStock;
        this.productDescription = productInOrder.productDescription;
        this.categoryType = productInOrder.categoryType;
        this.productStatus = 0;
        this.productSizes = [];
      }else{
            this.productId = null;
            this.productName = '';
            this.productPrice = 20;
            this.productStock = 100;
            this.productDescription = '';
            this.productIcons = [];
            this.categoryType = 0;
            this.productStatus = 0;
            this.productSizes = [];
      }
  }
}
