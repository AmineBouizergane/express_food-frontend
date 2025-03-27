import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Cook } from "../model/cook.model";
import { DeliveryPerson } from "../model/deliveryPerson.model";
import { Page } from "../model/page.model";

@Injectable({providedIn:"root"})
export class DeliveryService{
    constructor(private http:HttpClient){

    }

    getAllDeliveries():Observable<DeliveryPerson[]>{
        return this.http.get<DeliveryPerson[]>(environment.host+"/deliveryPerson");
    }
    
    getAllDeliveriesWithPaggination(page: number):Observable<Page<DeliveryPerson>>{
        return this.http.get<Page<DeliveryPerson>>(environment.host+"/deliveryPerson/search?page="+page);
    }

    
    addDelivery(newDelivery: DeliveryPerson) : Observable<any> {
        return this.http.post<any>(environment.host+"/deliveryPerson", newDelivery);
    }
}