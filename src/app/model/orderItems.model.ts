import { Product } from "./product.model";

export interface OrderItems{
    orderItemId:number;
    product:Product;
    qte:number;
    unitePrice:number;
    totalPrice:number;
}