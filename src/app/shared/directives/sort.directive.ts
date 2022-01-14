import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Sorter } from './../../core/helpers/sorter';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort!: any[];

  @Output() currentSortCol: EventEmitter<{sortedCol: string, direction: string}> = new EventEmitter<{sortedCol: string, direction: string}>();

  constructor(
    private element: ElementRef
  ) { }

  @HostListener('click') sortTable() {
    const sortHelper = new Sorter();

    const nativeElement = this.element.nativeElement;

    // Get attributes from native element
    const order = nativeElement.getAttribute('data-order');
    const property = nativeElement.getAttribute('data-name');

    // Do sort...
   this.appSort.sort(sortHelper.getSorter(property, order));

   // Move sort order...
   console.log(`Move sort order`);
   if (order === 'desc') {
     nativeElement.setAttribute('data-order', 'asc');
   } else {
    nativeElement.setAttribute('data-order', 'desc');
   }

   // Emit sorted informations
   this.currentSortCol.emit({
     sortedCol: property,
     direction: order
   })
  }
}
