import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonModel } from 'src/app/core/models/person-model';
import { SortDirective } from './sort.directive';

import { click, findEl } from './../../testing/helpers/element.spec-helper';
import { By } from '@angular/platform-browser';

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

@Component({
  template: `
  <div class="sorter">
    <span [ngClass]="{'up': true, 'is-active': sortedCol.sortedCol==='lastName' && sortedCol.direction==='asc'}"></span>
    <span
      [appSort]="persons"
      data-order="desc"
      data-name="lastName"
      (currentSortCol)="setCurrentSortCol($event)"
      [ngClass]="{'label': true, 'is-active': sortedCol.sortedCol==='lastName'}"
      data-testid="sort-on-lastname"
      >Sort on name</span>
      <span [ngClass]="{'down': true, 'is-active': sortedCol.sortedCol==='lastName' && sortedCol.direction==='desc'}"></span>
  </div>
  `
})
class HostComponent {
  public sortedCol: {sortedCol: string, direction: string} = {
    sortedCol: 'lastName',
    direction: 'asc'
  };

  public persons: PersonModel[] = [
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
  public setCurrentSortCol(sortedCol: {sortedCol: string, direction: string}): void {
    this.sortedCol = sortedCol;
  }

  
}

describe('SortDirective', () => {

  let fixture: ComponentFixture<HostComponent>;
  let spanSort: HTMLSpanElement;
  let ngSpanSort: DebugElement;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortDirective, HostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    // Get the span sort field needed
    spanSort = findEl(fixture, 'sort-on-lastname').nativeElement;
    ngSpanSort = findEl(fixture, 'sort-on-lastname');
    
  });

  it('should create an instance', () => {
    const directive = new SortDirective(null);
    expect(directive).toBeTruthy();
  });

  it(`Should have a 'lastName' sort col`, () => {
    const sortCol: string = spanSort.getAttribute('data-name');
    expect(sortCol).toBe('lastName');
  });

  it (`Should invoke appSort on click`, () => {
    const directive = fixture.debugElement.query(By.directive(SortDirective)).injector.get(SortDirective) as SortDirective;
    spy = spyOn(directive, 'sortTable');
    ngSpanSort.triggerEventHandler('click', null)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it (`Should change direction on click`, () => {
    const initialDirection: string = spanSort.getAttribute('data-order');
    click(fixture, 'sort-on-lastname');
    const newDirection: string = spanSort.getAttribute('data-order');
    expect(initialDirection !== newDirection).toBeTrue();
  });

  it(`Should have 'Jean-Luc Aubert' at last position after click`, () => {
    click(fixture, 'sort-on-lastname');
    const person: PersonModel = fixture.componentInstance.persons[3];
    const toString: string = person.firstName + ' ' + person.lastName;
    expect(toString).toBe('Jean-Luc Aubert');
  });
});
