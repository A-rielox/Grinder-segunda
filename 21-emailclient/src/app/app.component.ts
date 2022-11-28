import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent {
   title = '21-emailclient';
}
// npm install semantic-ui-css

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
