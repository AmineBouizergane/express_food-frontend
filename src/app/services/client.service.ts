import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Cook } from "../model/cook.model";
import { Client } from "../model/client.model";
import { Page } from "../model/page.model";
import { UserRequest } from "../model/userRequest.model";

@Injectable({providedIn:"root"})
export class ClientService{
    constructor(private http:HttpClient){

    }

    getAllClients(page: number): Observable<Page<Client>> {
        return this.http.get<Page<Client>>(`${environment.host}/client?page=${page}`);
    }

    addClient(newClient: UserRequest) : Observable<any> {
        return this.http.post<any>(environment.host+"/client", newClient);
    }
}