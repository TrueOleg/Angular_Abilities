import { Component, OnInit } from '@angular/core';
import { safe, changeLog } from './decorators';


@Component({
  selector: 'app-my-safe-decorator',
  templateUrl: './my-safe-decorator.component.html',
  styleUrls: ['./my-safe-decorator.component.scss']
})
export class MySafeDecoratorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.fooWithDecorator(null, { answer: 300 });
    // this.foo(null, { answer: 42 });
    this.log();
    this.logWithDec('123456');
  }
  public foo(str: string, data: any): boolean {
    return str.length > 0;
  }

  @safe public fooWithDecorator(str: string, data: any): boolean {
    return str.length > 0;
  }

  public log() {
    console.log('true log');
  }

  @changeLog public logWithDec(a) {
    console.log('true log', a);
  }

}
