import {Directive, ElementRef, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {IndexsService} from '../services/indexs.service';

@Directive({
  selector: '[appFreeDragging]',
})
export class FreeDraggingDirective implements OnInit, OnDestroy {
  @Input() arrIndex!: number;
  private element: HTMLElement | undefined;
  private initialX: number | undefined;
  private initialY: number | undefined;
  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private indexsService: IndexsService,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  ngOnInit(): void {
    const component = this.indexsService.getComp(this.arrIndex);
    // tslint:disable-next-line:no-non-null-assertion
    this.initialX = component.initialX;
    // tslint:disable-next-line:no-non-null-assertion
    this.initialY = component.initialY;
    this.element = this.elementRef.nativeElement as HTMLElement;
    // tslint:disable-next-line:no-non-null-assertion
    this.element!.style.zIndex = `${component.zIndex}`;
    this.element!.style.background = component.color;
    if (this.initialX && this.initialY) {
      // tslint:disable-next-line:no-non-null-assertion
      this.element!.style.transform =
        'translate3d(' + this.initialX + 'px, ' + this.initialY + 'px, 0)';
    }

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

    let currentX = this.initialX ? this.initialX : 0;
    let currentY = this.initialY ? this.initialY : 0;

    let dragSub: Subscription;

    // 3
    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      this.initialX = event.clientX - currentX;
      this.initialY = event.clientY - currentY;
      // tslint:disable-next-line:no-non-null-assertion
      this.element!.classList.add('free-dragging');
      // tslint:disable-next-line:no-non-null-assertion
      this.element!.style.zIndex = `9999999`;
      // 4
      // tslint:disable-next-line:no-shadowed-variable
      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        // tslint:disable-next-line:no-non-null-assertion
        currentX = event.clientX - this.initialX!;
        // tslint:disable-next-line:no-non-null-assertion
        currentY = event.clientY - this.initialY!;

        // tslint:disable-next-line:no-non-null-assertion
        this.element!.style.transform =
          'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
      });
    });

    // 5
    const dragEndSub = dragEnd$.subscribe(() => {
      this.initialX = currentX;
      this.initialY = currentY;
      // tslint:disable-next-line:no-non-null-assertion
      this.element!.classList.remove('free-dragging');
      if (dragSub) {
        dragSub.unsubscribe();
        // tslint:disable-next-line:no-non-null-assertion
        this.indexsService.elevateComponent(this.arrIndex!, this.initialX, this.initialY);
      }
    });

    // 6
    // @ts-ignore
    this.subscriptions.push.apply(this.subscriptions, [dragStartSub, dragEndSub,]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
