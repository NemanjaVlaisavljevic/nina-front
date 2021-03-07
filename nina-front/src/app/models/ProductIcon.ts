export class ProductIcon{
  productIcon : string;
  id : number;
  iconOrder : number;

  constructor(productIcon : string , iconOrder?: number){
    this.productIcon = productIcon;
    this.iconOrder = iconOrder;
  }
}
