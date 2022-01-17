import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { take } from 'rxjs/operators';
import { PersonService } from 'src/app/core/services/person.service';

@Injectable({
  providedIn: 'root'
})
export class UserNameValidator {
  public static myValidator: UserNameValidator;

  constructor(
    private personService: PersonService
  ) { 
    UserNameValidator.myValidator = this;
  }

  public static nameExists(control: AbstractControl): Promise<ValidationErrors | null> {
    return UserNameValidator.myValidator.alreadyExists(control);
  }

  public alreadyExists(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((iTakeMyPromise)=> {
      // Consume isNameAvailable from personService
      this.personService.isNameAvailable(control.value)
        .pipe(
          take(1)
        )
        .subscribe((httpResponse: HttpResponse<any>) => {
          if (httpResponse.status === 200) {
            iTakeMyPromise(null);
          } else {
            iTakeMyPromise({alreadyExists: true});
          }
        })
    });
  }
}
