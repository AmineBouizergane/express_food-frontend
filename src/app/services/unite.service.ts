import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "../model/page.model";
import { environment } from "../../environments/environment";
import { Unite } from "../model/unite.model";
import { MessageResponse } from "../model/messageResponse.model";

@Injectable({providedIn:"root"})
export class UniteService{
    constructor(private http:HttpClient){

    }

    getAllUnites():Observable<Unite[]>{          
        return this.http.get<Unite[]>(environment.host+"/unite");
    }

    getUniteById(uniteId: number):Observable<Unite>{
        return this.http.get<Unite>(environment.host+"/unite")
    }
    
    deleteUnit(uniteId: number): Observable<any> {
              
        const url = environment.host+"/unite?uniteId="+uniteId+"";    
        return this.http.delete<MessageResponse>(url);
    }

     
    
    addUnit(unit: Unite){
        const url = `${environment.host}/unite`;
        return this.http.post(url, unit);
    }  

    editUnit(unit: Unite){
        const url = `${environment.host}/unite`;
        return this.http.put(url, unit);
    }  
}