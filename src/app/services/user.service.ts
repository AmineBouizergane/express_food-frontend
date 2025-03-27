import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Cook } from "../model/cook.model";

@Injectable({providedIn:"root"})
export class UserService{
    constructor(private http:HttpClient){

    }
    
    enableUser(userId: number, status: boolean): Observable<any> {
        return this.http.put<any>(`${environment.host}/user/status?userId=${userId}&enabled=${status}`, {});
    }

    getUserProfile(): Observable<any> {
        return this.http.get<any>(`${environment.host}/user/authenticated`);
    }

    updatePassword(newPassword: string): Observable<any> {
        return this.http.put<any>(`${environment.host}/user/changePassword?newPassword=${newPassword}`, {});
    }

}