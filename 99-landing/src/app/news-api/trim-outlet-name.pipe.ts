import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'trimOutletName',
})
export class TrimOutletNamePipe implements PipeTransform {
   transform(title: string): unknown {
      return title.slice(0, title.indexOf(' - ')) + '.';
   }
}
