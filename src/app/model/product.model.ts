import { Category } from "./category.model";
import { Unite } from "./unite.model";
import {FeedBack} from "./feedBack.model";

export interface Product{
    productId : number;
    name : String;
    imageUrl : String;
    description : String;
    unitPrice : number;
    unite : Unite;
    category : Category;
    isAvailable : Boolean;
    avgRating: number;
    feedBacks: FeedBack[];
}
