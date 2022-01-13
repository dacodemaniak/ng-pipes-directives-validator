import { PersonModel } from "../models/person-model";

export class Sorter {
  private sortOrder: number = 1;
  private collator = new Intl.Collator(
    'fr-FR',
    {
      numeric: true,
      sensitivity: 'base'
    }
  );

  public getSorter(property: string, order: string): {(obj1: any, obj2: any): number} {
    if (order === 'desc') {
      this.sortOrder = -1;
    }

    return (obj1: any, obj2: any): number => {
      return this.collator.compare(obj1[property], obj2[property]) * this.sortOrder;
    }
  }
}
