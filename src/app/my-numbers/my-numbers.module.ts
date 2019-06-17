import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyNumbersComponent } from './my-numbers.component';
import { MyNumbersRoutingModule } from './my-numbers-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyNumbersComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MyNumbersRoutingModule
  ]
})
export class MyNumbersModule { }
