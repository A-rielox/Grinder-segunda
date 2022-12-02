import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, tap } from 'rxjs';

export interface SignupCredentials {
   username: string;
   password: string;
   passwordConfirmation: string;
}

interface SignupResponse {
   username: string;
}

export interface SigninCredentials {
   username: string;
   password: string;
}

interface SignedinResponse {
   authenticated: boolean;
   username: string;
}

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   rootUrl = 'https://api.angular-email.com';
   signedin$ = new BehaviorSubject(null); // null p' indicar q no conocemos es estado de autenticacion todavia

   constructor(private http: HttpClient) {}

   //////////////////////////////////////////
   //////////////////////////////////////////////////
   //
   usernameAvailable(username: string) {
      return this.http.post<{ available: boolean }>(
         this.rootUrl + '/auth/username',
         { username }
      );
   }

   //////////////////////////////////////////
   //////////////////////////////////////////////////
   //
   signup(credentials: SignupCredentials) {
      return this.http
         .post<SignupResponse>(this.rootUrl + '/auth/signup', credentials)
         .pipe(
            tap(() => {
               this.signedin$.next(true);
            })
         );
   }

   //////////////////////////////////////////
   //////////////////////////////////////////////////
   // revisa si ya esta logeado
   checkAuth() {
      return this.http
         .get<SignedinResponse>(
            this.rootUrl + '/auth/signedin' /* , {withCredentials: true} */
         )
         .pipe(
            tap((res) => {
               // console.log( res);  {authenticated: true, username: 'arielox1'}
               this.signedin$.next(res.authenticated);
            })
         );
   }

   //////////////////////////////////////////
   //////////////////////////////////////////////////
   //
   signout() {
      return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(
         tap(() => {
            // console.log(res); {}
            this.signedin$.next(false);
         })
      );
   }

   //////////////////////////////////////////
   //////////////////////////////////////////////////
   //
   signin(credentials: SigninCredentials) {
      return this.http
         .post<{ username: string }>(this.rootUrl + '/auth/signin', credentials)
         .pipe(
            tap(() => {
               // console.log(res); { username: wsxedc }
               this.signedin$.next(true);
            })
         );
   }
}

/* 
   rootUrl = 'https://api.angular-email.com';



mandar a 
arielo@angular-email.com

lista de correos en 
GET   https://api.angular-email.com/emails

UN correo
GET   https://api.angular-email.com/emails/:id


*/
