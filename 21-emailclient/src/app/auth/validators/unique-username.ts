import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
   constructor(private http: HttpClient) {}

   validate = (control: FormControl): Promise<any> | Observable<any> => {
      const { value } = control;

      return this.http.post<any>(
         'https://api.angular-email.com/auth/username',
         {
            username: value,
         }
      );
      //
      return of({ ok: 'sd' });
   };
}

/*  al poner tipo  "FormControl"  ( en lugar de AbstractControl )  en 

         validate(control: FormControl):
   
   debo usar  "as AsyncValidatorFn" en 

         [this.uniqueUsername.validate as AsyncValidatorFn]

   o aca usar "validate(control: AbstractControl)"
*/
