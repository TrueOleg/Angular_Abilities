import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPipesComponent } from './my-pipes.component';

const routes: Routes = [
  { path: '', component: MyPipesComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class MyPipesRoutingModule { }
