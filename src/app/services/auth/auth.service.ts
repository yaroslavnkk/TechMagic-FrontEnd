import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:4000';

  constructor(private http : HttpClient) { }

  register(userFirstName : string, userMiddleName : string, userLastName : string, userBirthDate : Date, email : string, password : string){
    return this.http.post(`${this.baseURL}/register`, {userFirstName,userMiddleName,userLastName,userBirthDate,email,password});
  }
  
  login(email : string, password : string){
    return this.http.post(`${this.baseURL}/login`, {email, password});
  }

}
