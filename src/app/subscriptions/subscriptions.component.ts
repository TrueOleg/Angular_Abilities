import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

interface Hero {
  name: string;
}

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  $data: BehaviorSubject<Hero[]>;
  data: Hero[];
  name: string;
  sub: Subscription;

  constructor() { }

  ngOnInit() {
    this.$data = new BehaviorSubject([
      { name: 'first' }
    ]);
    this.createSub();
  }

  addHero() {
    this.$data.next(this.$data.getValue().concat([{ name: this.name }]));
    this.name = '';
  }

  subToggle() {
    this.sub.closed ? this.createSub() : this.sub.unsubscribe();

    console.log('this.sub.closed', this.sub.closed);
  }

  createSub() {
    this.sub = this.$data.subscribe(data => {
      console.log('data=====', data);
      this.data = data;
    });
  }

}
