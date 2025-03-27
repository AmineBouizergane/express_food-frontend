import { Category } from "./category.model";
import { Unite } from "./unite.model";

export interface Product{
    productId : number;
    name : String;
    imageUrl : String;
    description : String;
    unitPrice : number;
    wholesalePrice : number;
    unite : Unite;
    category : Category;
    isAvailable : Boolean;
}