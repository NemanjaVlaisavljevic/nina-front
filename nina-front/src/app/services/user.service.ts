import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { JwtResponse } from '../response/JwtResponse';
import {catchError, tap} from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject : BehaviorSubject<JwtResponse>;
  public currentUser : Observable<JwtResponse>;
  public nameTerms = new Subject<string>();
  public name$ = this.nameTerms.asObservable();


  constructor(private httpClient : HttpClient , private cookieService : CookieService) {
    const memo = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(memo));
    this.currentUser = this.currentUserSubject.asObservable();
    cookieService.set('currentUser' , memo);
   }

   get currentUserValue() {
    return this.currentUserSubject.value;
}

   login(loginForm) : Observable<JwtResponse>{
        const url = `http://localhost:8080/api/auth/login`;
        return this.httpClient.post<JwtResponse>(url , loginForm).pipe(
          tap(user => {
              if(user && user.token){
                this.cookieService.set('currentUser' , JSON.stringify(user));
                if(loginForm.remembered){
                    localStorage.setItem('currentUser' , JSON.stringify(user));
                }
                this.nameTerms.next(user.name);
                this.currentUserSubject.next(user);
                return user;
              }
          }),
          catchError(this.handleError('Login Failed' , null))
        );
   };

   logout() : void {
     this.currentUserSubject.next(null);
     localStorage.removeItem('currentUser');
     this.cookieService.delete('currentUser');
   }

   signup(newUser : User) : Observable<User> {
     const url = `http://localhost:8080/api/auth/register`;
     return this.httpClient.post<User>(url , newUser);
   }

   update(existingUser : User) : Observable<User> {
     const url = `http://localhost:8080/api/auth/profile`;
     return this.httpClient.put<User>(url , existingUser);
   }

   getUserProfile(email : String) : Observable<User> {
    const url = `http://localhost:8080/api/auth/profile/${email}`;
    return this.httpClient.get<User>(url);
   }

   // Handle Errors Method
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
}
}
