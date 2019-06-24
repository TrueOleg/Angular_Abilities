import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallsComponent } from './balls.component';
import { BallsRoutingModule } from './balls-routing.module';

@NgModule({
  declarations: [
    BallsComponent
  ],
  imports: [
    CommonModule,
    BallsRoutingModule
  ]
})
export class BallsModule { }
