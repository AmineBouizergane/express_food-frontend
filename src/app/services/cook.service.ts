import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Cook } from "../model/cook.model";
import { Page } from "../model/page.model";

@Injectable({providedIn:"root"})
export class CookService{
    constructor(private http:HttpClient){

    }

    getAllCooks():Observable<Cook[]>{
        return this.http.get<Cook[]>(environment.host+"/cook");
    }

    getAllCooksWithPaggination(page: number):Observable<Page<Cook>>{
        return this.http.get<Page<Cook>>(environment.host+"/cook/search?page="+page);
    }

    
    addCook(newCook: Cook) : Observable<any> {
        return this.http.post<any>(environment.host+"/cook", newCook);
    }
}