import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SigninCredentials } from '../auth.service';

@Component({
   selector: 'app-signin',
   templateUrl: './signin.component.html',
   styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
   authForm = new FormGroup({
      username: new FormControl('', [
         Validators.required,
         Validators.minLength(3),
         Validators.maxLength(20),
         Validators.pattern(/^[a-z0-9]+$/),
      ]),
      password: new FormControl('', [
         Validators.required,
         Validators.minLength(4),
         Validators.maxLength(20),
      ]),
   });

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {}

   onSubmit() {
      if (this.authForm.invalid) {
         console.log('----------- authForm invalid');
         return;
      }

      this.authService
         .signin(<SigninCredentials>this.authForm.value)
         .subscribe({
            next: () => {
               // console.log('logeado bien', res); {username: 'arielox2', password: '1234'}
               this.router.navigateByUrl('/inbox');
            },
            error: ({ error }) => {
               // console.log(error); {username: 'Email not found!', password: 'Invalid password'}
               if (error.username || error.password) {
                  // va a meter un error a los " errores de la form "
                  this.authForm.setErrors({ credentials: true });
               } else {
                  this.authForm.setErrors({ unknownError: true });
               }
            },
         });
   }
}
