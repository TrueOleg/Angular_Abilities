import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeCyclesComponent } from './life-cycles.component';

const routes: Routes = [
  { path: '', component: LifeCyclesComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class LifeCyclesRoutingModule { }
