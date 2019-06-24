import { Component, OnInit, NgZone } from '@angular/core';
import 'zone.js';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit {

  parentZone: Zone;
  childZone: Zone;
  currentId = null;
  boxes = [];
  offsetX;
  offsetY;
  element;

  constructor(
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    for (let i = 0; i < 10000; i++) {
      const id = i;
      const x = getRandomInt(0, 500);
      const y = getRandomInt(0, 500);
      const box = {
        id,
        x,
        y
      };
      this.boxes.push(box);
    }
  }

  bindMouse = (ev) => {
    this.mouseMove(ev);
  }

  mouseDown(event) {
    const id = Number(event.target.getAttribute('dataId'));
    const box = this.boxes[id];
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    this.offsetX = box.x - mouseX;
    this.offsetY = box.y - mouseY;
    this.currentId = id;

    this.element = event.target;
    this.ngZone.runOutsideAngular(() => {
      window.document.addEventListener('mousemove', this.bindMouse);
    });
  }

  mouseMove(event) {
    event.preventDefault();
    this.element.setAttribute('x', event.clientX + this.offsetX + 'px');
    this.element.setAttribute('y', event.clientY + this.offsetY + 'px');
    // Another options is to change styles using transformations
    // this.element.style = `transform: translate3d(${event.clientX - this.off.mouseX}px,
    // ${event.clientY - this.off.mouseY}px, 0)`;
  }

  mouseUp($event) {
    this.ngZone.run(() => {
      this.updateBox(this.currentId, $event.clientX + this.offsetX, $event.clientY + this.offsetY);
      this.currentId = null;
    });
    window.document.removeEventListener('mousemove', this.bindMouse);
  }

  updateBox(id, x, y) {
    const box = this.boxes[id];
    box.x = x;
    box.y = y;
  }

  logNgZone() {
    console.log('NgZone', this.ngZone);
  }

  createParentZone() {
    this.parentZone = Zone.current.fork({
      name: 'my first zone',

      onInvoke(parentZoneDelegate, _, targetZone, delegate, applyThis, applyArgs, source) {
        console.log('Somewhere called method run...');

        return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
      },

      onScheduleTask(parentZoneDelegate, _, targetZone, task) {
        console.log('Somewhere we called таск and his callback will be later in our zone...');

        return parentZoneDelegate.scheduleTask(targetZone, task);
      },

      onInvokeTask(parentZoneDelegate, _, targetZone, task, applyThis, applyArgs) {
        console.log('Somewhere called tasks async callback...');
        console.log('task', task);
        return parentZoneDelegate.invoke(targetZone, task.callback, applyThis, applyArgs);
      },

      onHasTask(parentZoneDelegate, _, targetZone, hasTaskState) {
        console.log(hasTaskState);

        return parentZoneDelegate.hasTask(targetZone, hasTaskState);
      }

    });

    console.log('Parent Zone====>', this.parentZone);

    this.parentZone.run(() => {
      setTimeout(() => {
        console.log('привет через 2 секунды');
      }, 2000);
    });


  }

  createChildZone() {
    this.childZone = this.parentZone.fork({ name: 'child zone' });
    console.log('Child Zone====>', this.childZone);
  }

}
