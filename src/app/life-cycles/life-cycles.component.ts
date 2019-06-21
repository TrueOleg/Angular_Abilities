import {
  Component,
  SimpleChanges,
  OnInit,
  DoCheck,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-lifecycles',
  templateUrl: './life-cycles.component.html',
  styleUrls: ['./life-cycles.component.scss']
})
export class LifeCyclesComponent implements OnInit,
  DoCheck,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit {

  profile = {
    name: 'Oleg'
  };
  name = 'Oleg';
  count = 1;

  constructor() {
    console.log('Constructor');
  }

  ngOnInit() {
    setTimeout(() => {
      this.profile.name = 'Bruce';
    }, 2000);
    this.log(`ngOnInit`);
  }
  ngOnChanges() {
    this.log(`OnChanges`);
  }
  ngDoCheck() {

    this.log(`ngDoCheck`);
  }
  ngAfterViewInit() {

    this.log(`ngAfterViewInit`);
  }
  ngAfterViewChecked() {

    this.log(`ngAfterViewChecked`);
  }
  ngAfterContentInit() {

    this.log(`ngAfterContentInit`);
  }
  ngAfterContentChecked() {

    this.log(`ngAfterContentChecked`);
  }

  private log(msg: string) {
    console.log(this.count + '. ' + msg);
    this.count++;
  }

}
