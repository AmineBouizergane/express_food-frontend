import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "../model/page.model";
import { environment } from "../../environments/environment";
import { Category } from "../model/category.model";
import { Order } from "../model/order.model";
import { MessageResponse } from "../model/messageResponse.model";

@Injectable({providedIn:"root"})
export class OrderService{
    constructor(private http:HttpClient){

    }

    getAllOrders():Observable<Page<Order>>{
        return this.http.get<Page<Order>>(environment.host+"/order");
    }

    getFiltredOrders(statusId: number, deliveryDate : String):Observable<Page<Order>>{
        let params = new HttpParams();

        if (statusId) {
          params = params.set('statusId', statusId.toString());
        }
    
        if (deliveryDate) {
            params = params.set('deliveryDate', deliveryDate.toString());
        }
    
        return this.http.get<Page<Order>>(`${environment.host}/order`, { params });
    }

    getOrderById(orderId:number):Observable<Order>{
        return this.http.get<Order>(environment.host+"/order/"+orderId);
    }

    getAllOrderByClient():Observable<Page<Order>>{
        return this.http.get<Page<Order>>(environment.host+"/order/client");
    }

    getCurrentOrderByClient():Observable<Page<Order>>{
        return this.http.get<Page<Order>>(environment.host+"/order/client/current");
    }

    getOrderByCook():Observable<Page<Order>>{
        return this.http.get<Page<Order>>(environment.host+"/order/cook");
    }
    
    getOrderByDelivery():Observable<Page<Order>>{
        return this.http.get<Page<Order>>(environment.host+"/order/deliveryPerson");
    }

    changeOrderStatus(orderId: number, statusId: number): Observable<MessageResponse> {
        const url = `${environment.host}/order?orderId=${orderId}&statusId=${statusId}`;
        return this.http.put<MessageResponse>(url, {});
    }

    makeOrder(orderResponse: any): Observable<any> {
        const url = `${environment.host}/order`;
        return this.http.post<MessageResponse>(url, orderResponse);
    }

    
    updateOrder(order: Order): Observable<any> {
        const url = `${environment.host}/order`;
        return this.http.put<MessageResponse>(url, order);
      }

      
    setOrderToCook(orderId: number, selectedCookId: number):Observable<any> {
        const url = `${environment.host}/order/cook?orderId=${orderId}&cookId=${selectedCookId}`;
        return this.http.put<MessageResponse>(url, {});
    }

    setOrderToDelivery(orderId: number, selectedDeliveryId: number):Observable<any> {
        const url = `${environment.host}/order/deliveryPerson?orderId=${orderId}&deliveryPersonId=${selectedDeliveryId}`;
        return this.http.put<MessageResponse>(url, {});
    }

    searchOrderById(orderId: number):Observable<Order> {
        const url = `${environment.host}/order/${orderId}`;
        return this.http.get<Order>(url);
    }
}