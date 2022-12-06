import { Component, OnInit } from '@angular/core';
import { Email } from '../email';

@Component({
   selector: 'app-email-create',
   templateUrl: './email-create.component.html',
   styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
   showModal: boolean = false;

   email: Email; // lo puedo inicializar aqui mismo sin problema

   constructor() {
      this.email = {
         id: '',
         to: '',
         subject: '',
         html: '',
         text: '',
         // from: `${authService.username}@angular-email.com`,
         from: 'YO@angular-email.com',
      };
   }

   ngOnInit(): void {}
}
