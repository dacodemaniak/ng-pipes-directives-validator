import { Injectable } from '@angular/core';
import { IService } from '../interfaces/i-service';
import { PersonModel } from '../models/person-model';

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
    return this.persons.find((person: PersonModel) => person.lastName === name);
  }
}
