import { Component, OnInit } from '@angular/core';
import {
   AsyncValidatorFn,
   FormControl,
   FormGroup,
   ValidatorFn,
   Validators,
} from '@angular/forms';
import { AuthService, SignupCredentials } from '../auth.service';
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
      private uniqueUsername: UniqueUsername,
      private authService: AuthService
   ) {}

   ngOnInit(): void {
      // console.log(this.authForm.controls.username);
   }

   onSubmit() {
      if (this.authForm.invalid) return;

      // console.log(this.authForm.value); {username: '567tyu', password: 'asdf', passwordConfirmation: 'asdf'}

      this.authService
         .signup(<SignupCredentials>this.authForm.value)
         .subscribe({
            next: (res) => {
               console.log(res);

               // navigate to
               // this.router.navigateByUrl('/inbox');
            },
            error: (err) => {
               console.log(err);
               // error se llama cuando hay un error en el request
               // " !err.status " es lo mismo q " err.status === 0 "
               if (!err.status) {
                  // yellow 🟡 va a meter un error a los " errores de la form "
                  this.authForm.setErrors({ noConnection: true });
               } else {
                  this.authForm.setErrors({ unknownError: true });
               }
            },
         });
   }
}
