import { Injectable } from '@angular/core';
import { IService } from '../interfaces/i-service';
import { PersonModel } from '../models/person-model';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { delay, dematerialize, materialize, mergeMap, switchMap, switchMapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService implements IService<PersonModel> {

  private readonly persons: PersonModel[] = [
    {
      lastName: 'Aubert',
      firstName: 'Jean-Luc'
    },
    {
      lastName: 'Bond',
      firstName: 'James'
    }
  ];

  constructor() { }

  public findAll(): PersonModel[] {
    return this.persons;
  }

  public findOne(name: string): PersonModel | undefined {
    return this.persons.find((person: PersonModel) => person.lastName.toLowerCase() === name.toLowerCase());

    return this.persons.find(function (person: PersonModel) {
      return person.lastName ===  name;
    });

    for (let person of this.persons) {
      if (person.lastName === name) {
        return person;
      }
    }
    return undefined;
  }

  public isNameAvailable(name: string): Observable<HttpResponse<any>> {
    let httpResponse: HttpResponse<any>;

    const person: PersonModel | undefined = this.findOne(name);

    if( person === undefined) {
      httpResponse = new HttpResponse({
        status: 200,
        body: { message: 'ok'}
      });
    } else {
      httpResponse = new HttpResponse({
        status: 409,
        body: { message: 'Lastname was found'}
      });
    }

    //return of(httpResponse);

    // Return an observable of HttpResponse
    return of(null)
      .pipe(
        switchMapTo(of(httpResponse)),
        materialize(),
        delay(500),
        dematerialize()
      );
  }
}
