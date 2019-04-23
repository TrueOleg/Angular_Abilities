import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Add, Reset } from '../numbers.actions';

@Component({
  selector: 'app-my-numbers',
  templateUrl: './my-numbers.component.html',
  styleUrls: ['./my-numbers.component.scss']
})
export class MyNumbersComponent implements OnInit {
  $numbers: string[];
  newNumber: string;

  constructor(
    private store: Store<{ numbers: Array<string> }>
  ) { }

  ngOnInit() {
    this.store.dispatch(new Add({ number: '0' }));
    this.store.pipe(select('numbers')).subscribe((data) => {
      console.log('numbers', data);
      this.$numbers = data.numbers;
    });
  }

  addNumber() {
    // console.log('newNumber', this.newNumber);
    this.store.dispatch(new Add({ number: this.newNumber }));
    this.newNumber = null;
  }

  reset() {
    this.store.dispatch(new Reset());
  }

}
