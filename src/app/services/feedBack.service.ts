import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import {FeedBack} from "../model/feedBack.model";
import {Observable} from "rxjs";

@Injectable({providedIn:"root"})
export class FeedBackService{
    constructor(private http:HttpClient){

    }

    addFeedBack(feedBack: FeedBack, productId:number){
        const url = `${environment.host}/feed-back?productId=${productId}`;
        return this.http.post(url, feedBack);
    }
}
