import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BallsComponent } from './balls.component';

const routes: Routes = [
  { path: '', component: BallsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class BallsRoutingModule { }
