export interface User{
    id?:number;
    firstName:string;
    lastName:string;
    birthDay:Date;
    phoneNumber:string;
    address:string;
    avatarUrl:string | null;
    isActivated:boolean;
}
