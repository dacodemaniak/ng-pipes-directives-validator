import { PersonModel } from 'src/app/core/models/person-model';
import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  const pipe = new InitialsPipe();

  const person = new PersonModel();
  person.lastName = 'Aubert';
  person.firstName = 'Jean-Luc';

  const simplePerson = new PersonModel();
  simplePerson.firstName = 'James';
  simplePerson.lastName = 'Bond';

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform Jean-Luc Aubert to JA', () => {
    expect(pipe.transform(person)).toBe('JA');
  });

  it('should transform Jean-Luc Aubert to JLA', () => {
    expect(pipe.transform(person, {whole: true})).toBe('JLA');
  });

  it ('Should transform James Bond to JB without params', () => {
    const result: string = pipe.transform(simplePerson);
    expect(result).toBe('JB');
  });

  it ('Should transform James Bond to JB with params', () => {
    const result: string = pipe.transform(simplePerson, {whole: true});
    expect(result).toBe('JB');
  })
});
