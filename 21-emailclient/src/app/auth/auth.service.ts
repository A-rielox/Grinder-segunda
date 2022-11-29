import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

export interface SignupCredentials {
   username: string;
   password: string;
   passwordConfirmation: string;
}

interface SignupResponse {
   username: string;
}

interface SigninCredentials {
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
   signedin$ = new BehaviorSubject(false);

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
         .get<SignedinResponse>(this.rootUrl + '/auth/signedin')
         .pipe(
            tap((res) => {
               console.log(res);
            })
         );
   }

   //////////////////////////////////////////
   //////////////////////////////////////////////////
   //
}

/* 
   rootUrl = 'https://api.angular-email.com';



mandar a 
arielo@angular-email.com

lista de correos en 
GET   https://api.angular-email.com/emails

UN correo
GET   https://api.angular-email.com/emails/:id


usernameAvailable(username: string) {
         this.rootUrl + '/auth/username',


   signup(credentials: SignupCredentials) {
            .post<SignupResponse>(this.rootUrl + '/auth/signup', credentials)


   // revisa si ya esta logeado
         .get<SignedinResponse>(this.rootUrl + '/auth/signedin')


   signout() {
      return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(


   signin(credentials: SigninCredentials) {
         .post<{ username: string }>(this.rootUrl + '/auth/signin', credentials)
         */
