import {Directive, ElementRef, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {IndexsService} from '../services/indexs.service';

@Directive({
  selector: '[appFreeDragging]',
})
export class FreeDraggingDirective implements OnInit, OnDestroy {
  @Input()arrIndex: number | undefined;
  private element: HTMLElement | undefined;

  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private indexsService: IndexsService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLElement;
    this.initDrag();
  }

  initDrag(): void {
    // 1
    // tslint:disable-next-line:no-non-null-assertion
    const dragStart$ = fromEvent<MouseEvent>(this.element!, 'mousedown');
    const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup');
    const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
      takeUntil(dragEnd$)
    );

    // 2
    let initialX: number;
    let initialY: number;
    let currentX = 0;
    let currentY = 0;

    let dragSub: Subscription;

    // 3
    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;
      // tslint:disable-next-line:no-non-null-assertion
      this.element!.classList.add('free-dragging');

      // 4
      // tslint:disable-next-line:no-shadowed-variable
      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;

        // tslint:disable-next-line:no-non-null-assertion
        this.element!.style.transform =
          'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
      });
    });

    // 5
    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = currentX;
      initialY = currentY;
      // tslint:disable-next-line:no-non-null-assertion
      this.element!.classList.remove('free-dragging');
      if (dragSub) {
        dragSub.unsubscribe();
        // tslint:disable-next-line:no-non-null-assertion
        // this.indexsService.elevateComponent(this.arrIndex!);
      }
    });

    // 6
    // @ts-ignore
    this.subscriptions.push.apply(this.subscriptions, [dragStartSub, dragSub, dragEndSub,]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
