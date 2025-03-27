import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "../model/page.model";
import { environment } from "../../environments/environment";
import { Category } from "../model/category.model";

@Injectable({providedIn:"root"})
export class CategoryService{
    constructor(private http:HttpClient){

    }

    getAllCategories():Observable<Category[]>{
        return this.http.get<Category[]>(environment.host+"/category");
    }

    deleteCategory(categoryId: any){
        const url = `${environment.host}/category?categoryId=${categoryId}`;
        return this.http.delete(url);
    }     
    
    addCategory(category: Category){
        const url = `${environment.host}/category`;
        return this.http.post(url, category);
    }  

    editCategory(category: Category){
        const url = `${environment.host}/category`;
        return this.http.put(url, category);
    }  
}