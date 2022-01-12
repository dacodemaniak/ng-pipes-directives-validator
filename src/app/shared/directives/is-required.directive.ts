import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appIsRequired]'
})
export class IsRequiredDirective implements OnInit {
  @Input() public mark: string = '(*)';

  constructor(private elementRef: ElementRef) { }

  public ngOnInit(): void {
      const nativeElement: HTMLElement = this.elementRef.nativeElement;
      if (nativeElement.getAttribute('placeholder')) {
        const newPlaceHolder = nativeElement.getAttribute('placeholder') + ' ' + this.mark;
        nativeElement.setAttribute('placeholder', newPlaceHolder);
      }
  }
}
