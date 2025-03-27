import { Product } from "./product.model";

export interface CartItem{
    cardItemId : number;
    product : Product;
    qte:number;
    price: number;
}