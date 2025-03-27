import { CartItem } from "./cartItems.model";

export interface Cart{
    cartId: number;
    clientId: number;
    cartItems: CartItem[];
}