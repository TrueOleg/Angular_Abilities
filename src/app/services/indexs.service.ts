import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import DragedComponentInterface from '../interfaces/dragedComponent.interface';

const components = (() => {
  const arr = [];
  let n = 0;
  while (n < 10) {
    arr.push({
      zIndex: n + 1,
      initialX: undefined,
      initialY: undefined
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

  constructor() {
  }

  elevateComponent(arrIndex: number, initialX: number, initialY: number): void {
    const oldValue = this.dragedComponents.getValue();
    let newValue;
    if (oldValue[arrIndex].zIndex !== oldValue.length) {
      newValue = oldValue.map((component: DragedComponentInterface) => {
        return {
          zIndex: component.zIndex > oldValue[arrIndex].zIndex ? component.zIndex - 1 : component.zIndex,
          initialX: component.initialX,
          initialY: component.initialY,
        };
      });
      newValue[arrIndex].zIndex = newValue.length;
    } else {
      newValue = [...oldValue];
    }
    newValue[arrIndex].initialX = initialX;
    newValue[arrIndex].initialY = initialY;
    this.dragedComponents.next(newValue);
  }

  getComp(arrIndex: number): DragedComponentInterface {
    return this.dragedComponents.getValue()[arrIndex];
  }
}
