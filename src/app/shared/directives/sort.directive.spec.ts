import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonModel } from 'src/app/core/models/person-model';
import { SortDirective } from './sort.directive';

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
      >Sort on name</span>
      <span [ngClass]="{'down': true, 'is-active': sortedCol.sortedCol==='lastName' && sortedCol.direction==='desc'}"></span>
  </div>
  `
})
class HostComponent {}

describe('SortDirective', () => {

  let fixture: ComponentFixture<HostComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortDirective, HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    //input = findEl(fixture, 'input').nativeElement;
  });

  it('should create an instance', () => {
    const directive = new SortDirective(null);
    expect(directive).toBeTruthy();
  });
});
