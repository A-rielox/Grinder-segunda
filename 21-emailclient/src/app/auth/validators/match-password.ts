import { Injectable } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
   validate(formGroup: FormGroup) {
      const { password, passwordConfirmation } = formGroup.value;

      if (password === passwordConfirmation) {
         return null;
      } else {
         return { passwordsDontMatch: true };
      }
   }
}

/*  al poner tipo  "FormGroup"   en ( en lugar de AbstractControl )

         validate(formGroup: FormGroup)
   
   debo usar  "as ValidatorFn" en 

         { validators: [this.matchPassword.validate as ValidatorFn] }

   
   o aca usar "validate(control: AbstractControl)"
*/
