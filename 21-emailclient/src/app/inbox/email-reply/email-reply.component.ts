import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
   selector: 'app-email-reply',
   templateUrl: './email-reply.component.html',
   styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnInit {
   @Input() email: Email;

   showModal = false;

   constructor(private emailService: EmailService) {}

   ngOnInit(): void {}

   ngOnChanges() {
      let { to, from, text, subject } = this.email;

      text = text.replace(/\n/gi, '\n> ');

      this.email = {
         ...this.email,
         from: to,
         to: from,
         subject: `RE: ${subject}`,
         text: `\n\n\n------------ ${from} wrote:\n> ${text}`,
      };
   }

   onSubmit(email: Email) {
      this.emailService.sendEmail(email).subscribe(() => {
         this.showModal = false;
      });
   }
}
