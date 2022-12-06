import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
   selector: 'app-email-form',
   templateUrl: './email-form.component.html',
   styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
   @Input() email: Email;

   emailForm = new FormGroup({
      to: new FormControl('', [Validators.required, Validators.email]),
      from: new FormControl({ value: '', disabled: true }),
      subject: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
   });

   constructor() {}

   ngOnInit(): void {
      const { subject, from, to, text } = this.email;

      this.emailForm.setValue({
         to: to,
         from: from,
         subject: subject,
         text: text,
      });
   }

   onSubmit() {}
}
