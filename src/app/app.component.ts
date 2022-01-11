import { Component, OnInit } from '@angular/core';
import { PersonModel } from './core/models/person-model';
import { PersonService } from './core/services/person.service';
import { IntlService } from './intl/services/intl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  persons: PersonModel[] = [];
  person: PersonModel | undefined;

  public constructor(
    private personService: PersonService,
    private intlService: IntlService
  ) {}

  ngOnInit(): void {
    this.persons = this.personService.findAll();
  }

  public loadPerson(person: PersonModel): void {
    this.person = this.personService.findOne(person.lastName);
  }

  public initials(person: PersonModel): string {
    return person.firstName.charAt(0) + person.lastName.charAt(0);
  }
}
