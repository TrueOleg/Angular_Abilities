import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-life-cycles-child',
  templateUrl: './life-cycles-child.component.html',
  styleUrls: ['./life-cycles-child.component.scss']
})
export class LifeCyclesChildComponent implements OnInit, OnChanges {
  @Input() name: string;

  constructor() { this.log(`constructor`); }
  ngOnInit() { this.log(`onInit`); }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      this.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
  private log(msg: string) {
    console.log(msg);
  }

}
