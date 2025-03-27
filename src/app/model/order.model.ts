import { Client } from "./client.model";
import { Cook } from "./cook.model";
import { DeliveryPerson } from "./deliveryPerson.model";
import { OrderItems } from "./orderItems.model";
import { Status } from "./status.model";

export interface Order{
    orderId:number;
    client:Client;
    cook:Cook;
    deliveryPerson:DeliveryPerson;
    createdDate:Date;
    deliveryDate:Date;
    status:Status;
    orderItems: OrderItems[];
    address:String;
    description:String;
    totalPrice:number;
}