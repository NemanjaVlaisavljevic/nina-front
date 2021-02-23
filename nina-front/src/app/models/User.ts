import { UserRole } from "../enums/UserRole";

export class User{
  email : string;
  password : string;
  firstName : string;
  lastName : string;
  phone : string;
  city : string;
  streetAndNumber : string;
  userRole : UserRole;

  constructor(){
    this.userRole = UserRole.USER;
  }
}
