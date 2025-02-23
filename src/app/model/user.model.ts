export interface User{
    _id : string,
    userFirstName : string;
    userMiddleName : string;
    userLastName : string;
    userBirthDate : Date;
    email : string;
    password? : string;

}