import { PersonModel } from '../models/person-model';
import { Sorter } from './sorter';

describe('Sorter', () => {
  const persons: PersonModel[] = [
    {
      lastName: 'Zidane',
      firstName: 'Zinedine'
    },
    {
      lastName: 'Aubert',
      firstName: 'Jean-Luc'
    },
    {
      lastName: 'Bond',
      firstName: 'James'
    },
    {
      lastName: 'Latte',
      firstName: 'Truddy'
    },
  ];

  it('should create an instance', () => {
    expect(new Sorter()).toBeTruthy();
  });

  it(`getSorter method should return a function`, () => {
    const sorter: Function = new Sorter().getSorter('lastName', 'asc');
    expect(sorter).toBeInstanceOf(Function);
  });

  it(`Should have 'Aubert' while sorting on lastName ascending`, () => {
    const sorter: any = new Sorter().getSorter('lastName', 'asc');
    persons.sort(sorter);
    expect(persons[0].lastName).toBe('Aubert');
  });

  it(`Should have 'Zidane' while sorting on lastName descending`, () => {
    const sorter: any = new Sorter().getSorter('lastName', 'desc');
    persons.sort(sorter);
    expect(persons[0].lastName).toBe('Zidane');
  });

  it(`Should have 'Bond' while sorting on firstName ascending`, () => {
    const sorter: any = new Sorter().getSorter('firstName', 'asc');
    persons.sort(sorter);
    expect(persons[0].lastName).toBe('Bond');
  });

  it(`Should have 'Zidane' while sorting on firstName descending`, () => {
    const sorter: any = new Sorter().getSorter('firstName', 'desc');
    persons.sort(sorter);
    expect(persons[0].lastName).toBe('Zidane');
  });
});
