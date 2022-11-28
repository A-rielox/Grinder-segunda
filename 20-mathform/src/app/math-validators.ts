import { AbstractControl } from '@angular/forms';

export class MathValidators {
   static addition(sourceOne: string, sourceTwo: string, answer: string) {
      return (form: AbstractControl) => {
         const sum = form.value[answer];
         const firstNum = form.value[sourceOne];
         const secondNum = form.value[sourceTwo];

         if (firstNum + secondNum === parseInt(sum)) {
            return null;
         }

         return { addition: true };
      };
   }
}
