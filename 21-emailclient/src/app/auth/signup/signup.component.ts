import { Component, OnInit } from '@angular/core';
import {
   AsyncValidatorFn,
   FormControl,
   FormGroup,
   ValidatorFn,
   Validators,
} from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
   authForm = new FormGroup(
      {
         username: new FormControl(
            '',
            [
               Validators.required,
               Validators.minLength(3),
               Validators.maxLength(20),
               Validators.pattern(/^[a-z0-9]+$/),
            ],
            [this.uniqueUsername.validate as AsyncValidatorFn]
         ),
         password: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
         ]),
         passwordConfirmation: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
         ]),
      },
      { validators: [this.matchPassword.validate as ValidatorFn] }
   );

   constructor(
      private matchPassword: MatchPassword,
      private uniqueUsername: UniqueUsername
   ) {}

   ngOnInit(): void {
      // console.log(this.authForm.controls.username);
   }

   onSubmit() {
      console.log(this.authForm.value);
   }
}
