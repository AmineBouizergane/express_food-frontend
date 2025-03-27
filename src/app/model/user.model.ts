export interface User{
    id?:number;
    firstName:String;
    lastName:String;
    birthDay:Date;
    phoneNumber:String;
    address:String;
    avatarUrl:String | null;
    isActivated:Boolean;
}