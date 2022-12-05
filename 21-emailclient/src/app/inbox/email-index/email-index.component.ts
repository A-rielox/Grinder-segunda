import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
   selector: 'app-email-index',
   templateUrl: './email-index.component.html',
   styleUrls: ['./email-index.component.css'],
})
export class EmailIndexComponent implements OnInit {
   emails = [];

   constructor(private emailSevice: EmailService) {}

   ngOnInit(): void {
      this.emailSevice.getEmails().subscribe((emails) => {
         this.emails = emails;
      });
   }
}
