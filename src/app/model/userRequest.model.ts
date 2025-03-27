export interface UserRequest{
    id?:number;
    firstName:String;
    lastName:String;
    birthDay:Date;
    phoneNumber:String;
    userName:String;
    encryptedPassword:String;
    address:String;
    avatarUrl:String | null;
}