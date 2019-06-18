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

  nav(url) {
    this.router.navigateByUrl(url);
  }
}
