import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'y';
  array = ['1', '2', '3'];
  test = 0;
  constructor(
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  add(value) {
    console.log('array', this.array);
    this.array.push(value);
    this.cd.detectChanges();
    console.log('array', this.array);
  }
}
