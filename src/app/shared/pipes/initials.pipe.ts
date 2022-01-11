import { Pipe, PipeTransform } from '@angular/core';
import { PersonModel } from 'src/app/core/models/person-model';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: PersonModel, ...args: any[]): string {
    if (args.length) {
      if (args[0].hasOwnProperty('whole') && args[0].whole) {
        return this.wholeInitials(value);
      }
    }
    return this.simpleInitials(value);
  }

  private wholeInitials(value: PersonModel): string {
    let firstInitial = value.firstName.charAt(0);
    let initials: string = '';
    if (value.firstName.includes('-')) {
      let position: number = value.firstName.indexOf('-');
      
      let secondInitial = value.firstName.charAt(position + 1);
      initials = firstInitial + secondInitial;
    } else {
      initials = firstInitial;
    }
    return initials + value.lastName.charAt(0);
  }

  private simpleInitials(value: PersonModel): string {
    return value.firstName.charAt(0) + value.lastName.charAt(0);
  }
}
