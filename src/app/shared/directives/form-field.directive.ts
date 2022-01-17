import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFormField], form-field'
})
export class FormFieldDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  public ngOnInit(): void {
      this.elementRef.nativeElement.classList.add('group');
  }
}
