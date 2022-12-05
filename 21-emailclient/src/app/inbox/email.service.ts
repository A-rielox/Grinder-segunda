import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email';

interface EmailSummary {
   id: string;
   subject: string;
   from: string;
}

@Injectable({
   providedIn: 'root',
})
export class EmailService {
   rootUrl = 'https://api.angular-email.com';

   constructor(private http: HttpClient) {}

   getEmails() {
      return this.http.get<EmailSummary[]>(this.rootUrl + '/emails');
   }

   getEmail(id: string) {
      return this.http.get<Email>(this.rootUrl + '/emails/' + id);
   }

   sendEmail() {
      // this.rootUrl + '/emails', email
   }
}

/* 
mandar a 
arielox2@angular-email.com

lista de correos en 
GET   https://api.angular-email.com/emails

UN correo
GET   https://api.angular-email.com/emails/:id

SEND
sendEmail() {
      // this.rootUrl + '/emails', email
   }

   {
      subject: string;
      text: string;
      to: string;
      from: string;
   }
*/
