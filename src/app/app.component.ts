import {Component, OnInit} from '@angular/core';
import {distinct, finalize, map, mapTo, pluck, take, tap} from 'rxjs/operators';
import {defer, from, iif, interval, Observable, of} from 'rxjs';
import {IndexsService} from './services/indexs.service';
import DragedComponentInterface from './interfaces/dragedComponent.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Y';
  testArr: DragedComponentInterface[] = [];

  constructor(
    private indexsService: IndexsService
  ) {
  }

  ngOnInit(): void {
    this.indexsService.dragedComponents.subscribe((components: DragedComponentInterface[]) => {
      console.log('components', components)
      this.testArr = [...components];
    });
  }

  testTap(): void {
    const source = interval(1000).pipe(
      take(3),
      tap({
        next: (v: any) => console.log(`Side effect for i = ${v}`),
        complete: () => console.log('Side effect for COMPLETE!')
      })
    );

    source.subscribe({
      next: (v: any) => console.log(`Received i = ${v}`),
      complete: () => console.log('COMPLETE!')
    });
  }

  testIif(): void {
    function isTruthy(): boolean {
      return true;
    }

    function getTruthyStream(): Observable<string> {
      console.log('INSIDE #getTruthyStream');

      return of('Truthy').pipe(
        tap(() => console.log('Side effect in Truthy stream'))
      );
    }

    function getFalsyStream(): Observable<string> {
      console.log('INSIDE #getFalsyStream');

      return of('Falsy').pipe(
        tap(() => console.log('Side effect in Falsy stream'))
      );
    }

    const source = iif(isTruthy, getTruthyStream(), getFalsyStream());

    source.subscribe();
  }

  testDefer(): void {
    function isTruthy(): boolean {
      return true;
    }

    function getTruthyStream(): Observable<string> {
      console.log('INSIDE #getTruthyStream');

      return of('Truthy').pipe(
        tap(() => console.log('Side effect in Truthy stream'))
      );
    }

    function getFalsyStream(): Observable<string> {
      console.log('INSIDE #getFalsyStream');

      return of('Falsy').pipe(
        tap(() => console.log('Side effect in Falsy stream'))
      );
    }

    const defferredSource = defer(() =>
      isTruthy() ? getTruthyStream() : getFalsyStream()
    );

    defferredSource.subscribe();
  }

  testFinalize(): void {
    const source = interval(1000).pipe(
      take(3),
      finalize(() => console.log('FINALIZE'))
    );

    const sub = source.subscribe({
      next: v => console.log(`Received i = ${v}`),
      complete: () => console.log('COMPLETE')
    });
  }

  testFinalizeWithUnSub(): void {
    const source = interval(1000).pipe(
      take(3),
      finalize(() => console.log('FINALIZE'))
    );

    const sub = source.subscribe({
      next: v => console.log(`Received i = ${v}`),
      complete: () => console.log('COMPLETE')
    });

    setTimeout(() => {
      sub.unsubscribe();
    }, 1500);
  }

  testMapOperators(): void {
    const source1 = of('click event').pipe(map(() => true));

    const source2 = of('click event').pipe(mapTo(true));

    source1.subscribe({
      next: console.log
    });

    source2.subscribe({
      next: console.log
    });

    const source3 = of('click event').pipe(map(() => new Date().getSeconds()));

    const source4 = of('click event').pipe(mapTo(new Date().getSeconds()));

    setTimeout(() => {
      source3.subscribe({
        next: console.log
      });

      source4.subscribe({
        next: console.log
      });
    }, 3000);
  }

  testDistincOperator(): void {
    const numbers = [1, 2, 3, 3, 4, 5, 5];

    const source1 = from(numbers).pipe(distinct());

    source1.subscribe({
      next: console.log
    });
  }

  testDistincWithSelectorFunc(): void {
    const items = [
      { id: 1 },
      { id: 2 },
      { id: 2 },
      { id: 3 },
      { id: 8 },
      { id: 8 },
      { id: 'aaaaa' },
      { id: 'aaaaa' },
      { id: 'bbbb' },
      {fakeId: 123},
      {anotherFakeId: 123}
      ];

    const source2 = from(items).pipe(distinct(({ id }) => id));

    source2.subscribe({
      next: console.log
    });
  }

  // tslint:disable-next-line:typedef
  testDiffBetweenMapAndPluck() {
    const objectList = [
      {
        employee: {
          address: {
            houseNumber: 1
          }
        }
      },
      {
        employee: {
          // Damaged object
        }
      },
      {
        employee: {
          address: {
            houseNumber: 3
          }
        }
      }
    ];


    from(objectList).pipe(
      map(object => object.employee),
      map(employee => employee.address),
      // @ts-ignore
      map(address => address.houseNumber)
    ).subscribe(value => {
      console.log('value in map', value);
    }, error => {
      console.log('error in map', error);
    });

    from(objectList).pipe(
      pluck('employee', 'address', 'houseNumber')
    ).subscribe(value => {
      console.log('value in pluck', value);
    }, error => {
      console.log('error in pluck', error);
    });
  }
}
