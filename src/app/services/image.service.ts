import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Cook } from "../model/cook.model";

@Injectable({providedIn:"root"})
export class ImageService{
    
    constructor(private http:HttpClient){

    }
    
    uploadImage(uploadData : FormData) {
        return this.http.post(environment.host+'/images/upload', uploadData, {
            reportProgress: true,
            observe: 'events'
          });
    }
}