import { HttpResponse } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PersonModel } from '../models/person-model';

import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('Should return 2 PersonModel', () => {
    const persons: number = service.findAll().length;
    expect(persons).toBe(2);
  });

  it (`Should findOne return 'Aubert Jean-Luc' from the database`, () => {
    const person: PersonModel | undefined = service.findOne('Aubert');
    expect(person.lastName + ' ' + person.firstName).toBe('Aubert Jean-Luc');
    expect(person.firstName).toBe('Jean-Luc');
  });

  it (`Should findOne return undefined for 'Durant'`, () => {
    const person: PersonModel | undefined = service.findOne('Durand');
    expect(person).toBe(undefined);
  });

  it (`Should get a 409 for 'Aubert'`, waitForAsync(() => {
    const response$: Observable<HttpResponse<any>> = service.isNameAvailable('Aubert');
    expect(response$).toBeInstanceOf(Observable);
    response$
      .pipe(
        take(1)
      )
      .subscribe(
        (response) => {
          expect(response).toBeInstanceOf(HttpResponse);
          expect(response.status).toBe(409);
        },
        (error) => {
          console.log(error)
        }
      );
  }));

  it (`Should get a 200 for 'Durant'`, waitForAsync(() => {
    const response$: Observable<HttpResponse<any>> = service.isNameAvailable('Durant');
    expect(response$).toBeInstanceOf(Observable);
    response$
      .pipe(
        take(1)
      )
      .subscribe(
        (response) => {
          expect(response).toBeInstanceOf(HttpResponse);
          expect(response.status).toBe(200);
        },
        (error) => {
          console.log(error)
        }
      );
  }));
});

