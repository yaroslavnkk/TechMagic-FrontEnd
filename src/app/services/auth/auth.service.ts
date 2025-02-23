import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseURL = 'http://localhost:4000';
  private token = 'authToken';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoggedIn = false;

  constructor(private http : HttpClient, private router : Router) {
      
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
    
   }

  get currentUser() : Observable<User | null>{
    return this.currentUserSubject.asObservable();
  }

  register(userFirstName : string, userMiddleName : string, userLastName : string, userBirthDate : Date, email : string, password : string){
    return this.http.post(`${this.baseURL}/register`, {userFirstName,userMiddleName,userLastName,userBirthDate,email,password});
  }
  
  login(email : string, password : string) {
    return this.http.post<{token: string, user : User}>(`${this.baseURL}/login`, {email, password}).pipe(
      tap(response => {
        localStorage.setItem(this.token, response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
        this.router.navigate(['/home'])
        this.isLoggedIn = true;
      })
    )
    };

    isAuthenticated() : boolean{
      return this.isLoggedIn || !!localStorage.getItem(this.token);
    }

    logout() : void{
        localStorage.removeItem(this.token);
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
        this.isLoggedIn = false;
    }
}
