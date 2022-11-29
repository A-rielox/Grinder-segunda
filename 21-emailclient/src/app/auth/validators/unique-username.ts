import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';

import { AuthService } from '../auth.service';

import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
   constructor(private authService: AuthService) {}

   // la fnc esta escrita como arrow fcn xq como la llama angular al querer validar => me descalabra el " this. "
   validate = (control: FormControl): Promise<any> | Observable<any> => {
      const { value } = control;

      return this.authService.usernameAvailable(value).pipe(
         map((value) => {
            if (value.available) {
               return null;
            }

            return of({
               jajajja:
                  'este NO es necesario porque esta api si es q esta disponible => manda el {available: true}, y si es q ya esta tomado manda un error 422, el que se iria directo al catchError ',
            });
         }),
         catchError((err) => {
            // console.log('desde el catchError ', err);

            return of({ nonUniqueUsername: true });
         })
      );
   };
}

// 🟡 yellow catchError DEBE devolver un observable, tengo q poner el catch error xq la API devuelve un error 422 cuando el nombre esta tomado

// 🟡 yellow
// para agarrar los errores q vengan de requests ( los 400's y 500's ) tengo q agarrarlos con catchError, ya q el observable ( el post o get o lo q sea ) NO me los tira por el next, sino como errores

/*  al poner tipo  "FormControl"  ( en lugar de AbstractControl )  en 

         validate(control: FormControl):
   
   debo usar  "as AsyncValidatorFn" en 

         [this.uniqueUsername.validate as AsyncValidatorFn]

   o aca usar "validate(control: AbstractControl)"
*/
