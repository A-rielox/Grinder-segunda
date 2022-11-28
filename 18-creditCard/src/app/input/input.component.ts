import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
   selector: 'app-input',
   templateUrl: './input.component.html',
   styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
   @Input() control: FormControl;
   @Input() label: string = '';

   constructor() {}

   ngOnInit(): void {
      // console.log('desde control ------ ', this.label, this.control);
   }

   showErrors() {
      const { dirty, touched, errors } = this.control;

      return touched && errors && dirty;
   }
}
