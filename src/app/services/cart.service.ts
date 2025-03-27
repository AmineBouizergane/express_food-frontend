import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Category } from "../model/category.model";
import { MessageResponse } from "../model/messageResponse.model";
import { Cart } from "../model/cart.model";

@Injectable({providedIn:"root"})
export class CartService{
    constructor(private http:HttpClient){

    }

    getCart(): Observable<Cart> {
        const url = `${environment.host}/cart`; // Assuming environment.apiUrl is set to your Java API's base URL
        return this.http.get<Cart>(url);
    }

    changeCartItemQuantity(cardItemId: number, quantity: number): Observable<any> {
        const url = `${environment.host}/cart?itemId=${cardItemId}&qty=${quantity}`; // Assuming environment.apiUrl is set to your Java API's base URL
        return this.http.put<any>(url, null);
    }

    removeCartItem(cardItemId: number): Observable<any> {
        const url = `${environment.host}/cart?itemId=${cardItemId}`; // Assuming environment.apiUrl is set to your Java API's base URL
        return this.http.delete<any>(url);
      }

    addItemToCart(itemId: number): Observable<any> {
        const url = `${environment.host}/cart?itemId=${itemId}`; // Assuming environment.apiUrl is set to your Java API's base URL
        return this.http.post<any>(url, null);
    }

    addItemToCartWithQty(itemId: number, qty:number): Observable<any> {
        const url = `${environment.host}/cart?itemId=${itemId}&qty=${qty}`; // Assuming environment.apiUrl is set to your Java API's base URL
        return this.http.post<any>(url, null);
    }
    
    getCartItemCount() : Observable<any> {
        const url = `${environment.host}/cartItemCount`; // Assuming environment.apiUrl is set to your Java API's base URL
        return this.http.get<any>(url);
    }
}