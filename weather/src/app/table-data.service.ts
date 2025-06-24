import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Element {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
];

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  getData(): Observable<Element[]> {
    return of(ELEMENT_DATA);
  }
}
