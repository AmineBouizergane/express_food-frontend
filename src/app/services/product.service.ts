import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../model/product.model";
import { Observable } from "rxjs";
import { Page } from "../model/page.model";
import { environment } from "../../environments/environment";
import { MessageResponse } from "../model/messageResponse.model";
import { ProductRequest } from "../model/productRequest.model";

@Injectable({providedIn:"root"})
export class ProductService{

    constructor(private http:HttpClient){

    }

    getAllProducts(page: number):Observable<Page<Product>>{
           
        return this.http.get<Page<Product>>(environment.host+"/product?page="+page);
    }

    getProductsByKeyword(keyword: string, page: number): Observable<Page<Product>> {
        const url = `${environment.host}/product/search?keyword=${keyword}&page=${page}`;
        return this.http.get<Page<Product>>(url);
      }

    getProductById(productId:number):Observable<Product>{
           
        return this.http.get<Product>(environment.host+"/product/"+productId);
    }


    getAvailableProducts(page:number):Observable<Page<Product>>{
           
        return this.http.get<Page<Product>>(environment.host+"/product/available?page="+page);
    }
    
    getAvailableProductsByCategory(selectedCategoryId: number, page:number): Observable<Page<Product>> | null {
        return this.http.get<Page<Product>>(environment.host+"/product/available/category?categoryId="+selectedCategoryId+"&page="+page);
    }

    searchProducts(searchKeyword: string, selectedCategoryId: number | null): Observable<Page<Product>> | null {
        if (selectedCategoryId) {          
            return this.http.get<Page<Product>>(environment.host+"/product/available/search?keyword="+searchKeyword+"&categoryId="+selectedCategoryId);
        }else {           
            return this.http.get<Page<Product>>(environment.host+"/product/available/search?keyword="+searchKeyword);
        }
    }

    addProduct(product : ProductRequest){
       return this.http.post(environment.host+"/product", product);
    }

    deleteProduct(productId: any){
        const url = `${environment.host}/product/${productId}`;
        return this.http.delete(url, { headers: environment.headers });
    } 
    
    
    updateProduct(product: ProductRequest) : Observable<any> {
        return this.http.put(environment.host+"/product", product);
      }
}