import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  /**
   * Form group for adding a new person
   */
  personForm!: FormGroup;

  passwordState: boolean = true;

  public constructor(
    private personService: PersonService,
    private intlService: IntlService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.persons = this.personService.findAll();

    this.personForm = this.formBuilder.group({
      lastName: [
        '',
        Validators.required
      ],
      firstName: [
        ''
      ],
      email: [
        '',
        Validators.compose([
          Validators.email,
          Validators.required
        ])
      ],
      confirmEmail: [
        '',
        Validators.required
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ],
      confirmPassword: [
        '',
        Validators.required
      ]
    });
  }

  public loadPerson(person: PersonModel): void {
    this.person = this.personService.findOne(person.lastName);
  }

  toggleConfirmPassword(passwordState: boolean): void {
    this.passwordState = passwordState;
  }

}
