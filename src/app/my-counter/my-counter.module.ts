import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCounterComponent } from './my-counter.component';
import { MyCounterRoutingModule } from './my-counter-routing.module';

@NgModule({
  declarations: [
    MyCounterComponent
  ],
  imports: [
    CommonModule,
    MyCounterRoutingModule
  ]
})
export class MyCounterModule { }
