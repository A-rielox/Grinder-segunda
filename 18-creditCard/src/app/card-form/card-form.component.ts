import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormControl } from '../date-form-control';

@Component({
   selector: 'app-card-form',
   templateUrl: './card-form.component.html',
   styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
   // con 'nonNullable: true' al resetear me pone '' en lugar de null

   cardForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cardNumber: new FormControl('', {
         validators: [
            Validators.required,
            Validators.minLength(16),
            Validators.maxLength(16),
         ],
         nonNullable: true,
      }),
      expiration: new DateFormControl('', [
         Validators.required,
         // 01/02 mes año
         Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
      ]),
      securityCode: new FormControl('', [
         Validators.required,
         Validators.minLength(3),
         Validators.maxLength(3),
      ]),
   });

   constructor() {
      // console.log(this.cardForm.controls.name);
   }

   ngOnInit(): void {}

   onSubmit() {
      console.log('valor submitted ---- ', this.cardForm.value);
   }

   onResetClick() {
      this.cardForm.reset();
   }
}
