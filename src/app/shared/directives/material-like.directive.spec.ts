import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findEl } from 'src/app/testing/helpers/element.spec-helper';
import { FormFieldDirective } from './form-field.directive';
import { MaterialLikeDirective } from './material-like.directive';

/**
 * Poor template for testing only
 */
@Component({
  template: `
    <form-field class="form-group">
      <input
        appMaterialLike
        type="text"
        placeholder="Your name..."
        data-testid="input"
      >
    </form-field>

    <div appFormField class="form-group">
      <input
        appMaterialLike
        type="text"
        placeholder="Your name..."
        data-testid="child-input"
      >
</div>
  `
})
class HostComponent {}

describe('MaterialLikeDirective', () => {
  /**
   * Sets some utilities variables
   */
  let fixture: ComponentFixture<HostComponent>;
  let input: HTMLInputElement;
  let childInput: HTMLInputElement;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [
        FormFieldDirective,
        MaterialLikeDirective,
        HostComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    input = findEl(fixture, 'input').nativeElement;
    childInput = findEl(fixture, 'child-input').nativeElement;
  });

  it('should create an instance', () => {
    const directive = new MaterialLikeDirective(null);
    expect(directive).toBeTruthy();
  });

  it (`Should have a parent 'form-field'`, () => {
    const parent: HTMLElement = input.parentElement;
    const tagName: boolean = parent.tagName === 'FORM-FIELD';
    
    expect(tagName).toBe(true);
  });

  it (`Should have a parent with 'appFormField' attribute directive`, () => {
    const parent: HTMLElement = childInput.parentElement;
    const formFieldDirective: any = parent.getAttribute('appFormField') !== null;

    expect(formFieldDirective).toBe(true);
  });

});
