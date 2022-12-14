import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
   selector: 'app-email-show',
   templateUrl: './email-show.component.html',
   styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
   email: Email = { id: '', subject: '', text: '', to: '', from: '', html: '' };

   constructor(private route: ActivatedRoute) {
      this.route.data.subscribe((res) => {
         // la data q mando desde el resolver
         // console.log(res); {email: {…}}
         this.email = res['email'];
      });
   }

   ngOnInit(): void {
      // this.route.params
      //    .pipe(
      //       switchMap(({ id }) => {
      //          return this.emailService.getEmail(id);
      //       })
      //    )
      //    .subscribe((email) => {
      //       this.email = email;
      //    });
   }
}
