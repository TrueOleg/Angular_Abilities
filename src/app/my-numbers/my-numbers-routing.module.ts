import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyNumbersComponent } from './my-numbers.component';

const routes: Routes = [
  { path: '', component: MyNumbersComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class MyNumbersRoutingModule { }
