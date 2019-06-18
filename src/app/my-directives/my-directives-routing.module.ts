import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDirectivesComponent } from './my-directives.component';

const routes: Routes = [
  { path: '', component: MyDirectivesComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class MyDirectivesRoutingModule { }
