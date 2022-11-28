import { FormControl } from '@angular/forms';

export class DateFormControl extends FormControl {
   override setValue(value: string | null, options: any) {
      // console.log(value);
      // console.log(this.value);

      if (!value) {
         super.setValue('', { ...options, emitModelToViewChange: true });
         return;
      }

      if (value.match(/[^0-9|\/]/gi)) {
         // this.value es el current value en el input
         // el value es lo q se pasa hacia el input ( lo q tecleo, lo q trato de ingresar )
         // si NO es numero => re-mando lo q ya esta en el input
         super.setValue(this.value, {
            ...options,
            emitModelToViewChange: true,
         });
         return;
      }

      if (value.length > 5) {
         // si es mayor de 5 => re-mando lo del input
         super.setValue(this.value, {
            ...options,
            emitModelToViewChange: true,
         });
         return;
      }

      if (value.length === 2 && this.value.length === 3) {
         // cuando borro el "/" lo q mando es length = 2, y lo q hay en el input es length = 3
         // en este caso mando lo q le ingreso
         super.setValue(value, { ...options, emitModelToViewChange: true });
         return;
      }

      if (value.length === 2) {
         super.setValue(value + '/', {
            ...options,
            emitModelToViewChange: true,
         });
         return;
      }

      super.setValue(value, { ...options, emitModelToViewChange: true });
   }
}

// p' generar la clase
// ng g class DateFormControl
