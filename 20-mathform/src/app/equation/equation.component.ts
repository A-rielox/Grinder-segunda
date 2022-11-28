import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, filter } from 'rxjs';
import { MathValidators } from '../math-validators';

@Component({
   selector: 'app-equation',
   templateUrl: './equation.component.html',
   styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
   mathForm = new FormGroup(
      {
         a: new FormControl(this.randomNumber()),
         b: new FormControl(this.randomNumber()),
         answer: new FormControl(''),
      },
      [MathValidators.addition('a', 'b', 'answer')]
   );

   constructor() {}

   // para acceder de forma directa al valor en el .html simplemente como {{ a }}
   get a() {
      return this.mathForm.value.a;
   }

   ngOnInit(): void {
      this.mathForm.statusChanges
         .pipe(
            filter((value) => value === 'VALID'),
            delay(300)
         )
         .subscribe(() => {
            this.mathForm.setValue({
               a: this.randomNumber(),
               b: this.randomNumber(),
               answer: '',
            });
            // a setValue() le tengo q pasar todos los valores de la form, si solo quiero resetear algunos ( xq pueden ser muchos inputs ) ocupo .patchValue({ ... })
         });
   }

   randomNumber() {
      return Math.floor(Math.random() * 10);
   }
}

// ng g class MathValidators --skip-tests true

//          la forma con el validador de la forma total
// a "form" en (form: AbstractControl) se le pasa toda la form ( la mathForm )
//
// mathForm = new FormGroup(
//    {
//       a: new FormControl(this.randomNumber()),
//       b: new FormControl(this.randomNumber()),
//       answer: new FormControl(''),
//    },
//    [
//       (form: AbstractControl) => {
//          const { a, b, answer } = form.value;
//
//          if (a + b === parseInt(answer)) {
//             return null;
//          }
//
//          return { addition: true };
//       },
//    ]
// );
