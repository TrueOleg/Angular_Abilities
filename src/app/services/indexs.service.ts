import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import DragedComponentInterface from "../interfaces/dragedComponent.interface";

const components = (() => {
  const arr = [];
  let n = 0;
  while (n < 10) {
    arr.push({
      zIndex: n + 1
    });
    n++;
  }
  return arr;
});

@Injectable({
  providedIn: 'root'
})
export class IndexsService {
  public dragedComponents = new BehaviorSubject<DragedComponentInterface[]>(components());

  constructor() { }

  elevateComponent(arrIndex: number): void {
    const oldValue = this.dragedComponents.getValue();
    console.log('oldValue', oldValue);
    const newValue = oldValue.map((component: DragedComponentInterface) => {
      return {
        zIndex: component.zIndex - 1
      };
    });
    newValue[arrIndex].zIndex = newValue.length;
    this.dragedComponents.next(newValue);
  }
}
