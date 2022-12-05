import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-email-reply',
   templateUrl: './email-reply.component.html',
   styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnInit {
   @Input() email;

   constructor() {}

   ngOnInit(): void {}
}
