import { Directive, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';


const enum States {
  SHOW = 'Show',
  HIDE = 'Hide',
  SHOW_ICON = 'icon-eye',
  HIDE_ICON = 'icon-eye-blocked'
};

@Directive({
  selector: '[appShowHidePassword]'
})
export class ShowHidePasswordDirective implements OnInit {
  @Input() public mode: string = 'text';

  @Output() public isHideMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _passwordState: boolean = true;
  private _spanElement!: HTMLElement;

  constructor(private element: ElementRef) {
    //this.init();
  }

  public ngOnInit(): void {
    console.log(`Mode is : ${this.mode}`);
    const parentElement = this.element.nativeElement.parentNode;
    this._spanElement = document.createElement('span');
    this.mode === 'text' ?
      this._spanElement.textContent = States.SHOW :
      this._spanElement.classList.add(States.SHOW_ICON);

    this._spanElement.addEventListener(
      'click',
      (event: any) => {
        this._toggleDisplay();
      }
    );
    parentElement.appendChild(this._spanElement);
  }

  private _toggleDisplay(): void {

    this._passwordState = !this._passwordState;

    if (this._passwordState) {
      this._resetState();
      this.isHideMode.emit(true);
    } else {
      this.element.nativeElement.setAttribute('type', 'text');
      this.mode === 'text' ? 
        this._spanElement.textContent = States.HIDE :
        this._spanElement.classList.add(States.HIDE_ICON);
        this.isHideMode.emit(false);
      this._timeOut();    
    }
  }

  private _timeOut(): any {
    return setTimeout(
      () => {
        this._resetState();
        this.isHideMode.emit(true);
      },
      1000
    )
  }

  private _resetState(): void {
    
    this._passwordState = true;
    this.element.nativeElement.setAttribute('type', 'password');
    if (this.mode === 'text') {
      this._spanElement.textContent = States.SHOW
    } else {
      this._spanElement.classList.remove(States.HIDE_ICON);
      this._spanElement.classList.add(States.SHOW_ICON);
    }
  }
}
