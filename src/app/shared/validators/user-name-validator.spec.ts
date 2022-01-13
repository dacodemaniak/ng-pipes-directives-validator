import { TestBed } from '@angular/core/testing';

import { UserNameValidator } from './user-name-validator';

describe('UserNameValidatorService', () => {
  let service: UserNameValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNameValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
