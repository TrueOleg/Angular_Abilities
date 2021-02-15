import { Component } from '@angular/core';
import {distinct, finalize, map, mapTo, take, tap} from 'rxjs/operators';
import {defer, from, iif, interval, Observable, of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Y';

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
    const items = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }, { id: 8 }, { id: 8 }, { id: 'aaaaa' }, { id: 'aaaaa' }, { id: 'bbbb' }, {fakeId: 123}, {anotherFakeId: 123}];

    const source2 = from(items).pipe(distinct(({ id }) => id));

    source2.subscribe({
      next: console.log
    });
  }
}
