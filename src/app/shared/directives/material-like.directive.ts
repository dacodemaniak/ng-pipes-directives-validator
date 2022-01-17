import { Directive, ElementRef, OnInit } from '@angular/core';
import { element } from 'protractor';

@Directive({
  selector: '[appMaterialLike]'
})
export class MaterialLikeDirective implements OnInit {
  private nativeElement!: HTMLElement;

  constructor(private elementRef: ElementRef) { }

  public ngOnInit(): void {
      this.nativeElement = this.elementRef.nativeElement;
      const parentEl: HTMLElement = this.nativeElement.parentElement;
      
      if (parentEl.tagName !== 'FORM-FIELD') {
        if (parentEl.getAttribute('appFormField') === null) {
          throw new Error(`appMaterialLike must be child of a 'form-field' element`);
        }
      }

      this._setParentStyles(parentEl);

      this._setSpans(parentEl);

      // Special meaning for label
      if (!this._hasLabel(parentEl)) {
        // Create label from placeholder
        parentEl.appendChild(this._createLabel());
      }
  }

  private _setParentStyles(element: HTMLElement): void {
    if (!element.classList.contains('group')) {
      element.classList.add('group');
    }
  }

  private _setSpans(element: HTMLElement): void {
    const span: HTMLElement = document.createElement('span');
    span.classList.add('highlight');

    element.appendChild(span);

    const barSpan: HTMLElement = document.createElement('span');
    barSpan.classList.add('bar');

    element.appendChild(barSpan);
  }

  private _hasLabel(element: HTMLElement): boolean {
    const labels: Element[] = Array.from(element.children)
      .filter((child: HTMLElement) => child.tagName === 'LABEL');
    return labels.length > 0;
  }

  private _createLabel(): HTMLElement {
    let placeholder: string | null;
    placeholder = this.nativeElement.getAttribute('placeholder');
    if (placeholder === null) {
      placeholder = 'placeholder missing';
    }

    const label: HTMLLabelElement = document.createElement('label');
    label.innerText = placeholder;

    // Remove placeholder native attribute
    this.nativeElement.removeAttribute('placeholder');
    
    return label;
  }
}
