import { Client } from "./client.model";

export interface FeedBack{
    comment: string;
    rating: number;
    client?: Client;
}
