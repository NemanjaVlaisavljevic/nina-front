import { ProductInOrder } from "./ProductInOrder";

export class OrderForm{
  buyerEmail : string;
  buyerCity : string;
  buyerStreetAndNumber : string;
  buyerFirstName : string;
  buyerPhone : string;
  buyerLastName : string;
  orderAmount : number;
  products : ProductInOrder[];
}
