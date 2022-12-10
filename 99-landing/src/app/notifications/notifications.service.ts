import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';

export interface Command {
   id: number;
   type: 'success' | 'error' | 'clear';
   text?: string;
}

@Injectable({
   providedIn: 'root',
})
export class NotificationsService {
   messagesInput: Subject<Command>;
   messagesOutput: Observable<Command[]>;

   constructor() {
      this.messagesInput = new Subject<Command>();

      this.messagesOutput = this.messagesInput.pipe(
         scan((acc: Command[], value: Command) => {
            if (value.type === 'clear') {
               return acc.filter((mess) => mess.id !== value.id);
            } else {
               return [...acc, value];
            }
         }, [])
      );
   }

   addSuccess(message: string) {
      const id = this.randomId();

      console.log(id);

      this.messagesInput.next({
         id,
         type: 'success',
         text: message,
      });

      setTimeout(() => {
         this.clearMessage(id);
      }, 5000);
   }

   addError(message: string) {
      const id = this.randomId();

      this.messagesInput.next({
         id,
         type: 'error',
         text: message,
      });

      setTimeout(() => {
         this.clearMessage(id);
      }, 5000);
   }

   clearMessage(id: number) {
      this.messagesInput.next({
         id,
         type: 'clear',
      });
   }

   private randomId() {
      return Math.round(Math.random() * 10000);
   }
}
