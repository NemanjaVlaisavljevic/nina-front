import { ProductInOrder } from "./ProductInOrder";

export class Order{
  orderId : number;
  buyerEmail : string;
  buyerName : string;
  buyerLastName : string;
  buyerPhone : string;
  buyerCity : string;
  buyerStreetAndNumber : string;
  orderAmount : string;
  orderStatus : string;
  createTime : string;
  updateTime : string;
  products : ProductInOrder[];
}
