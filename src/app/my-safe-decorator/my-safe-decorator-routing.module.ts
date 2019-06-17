import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySafeDecoratorComponent } from './my-safe-decorator.component';

const routes: Routes = [
  { path: '', component: MySafeDecoratorComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class MySafeDecoratorRoutingModule { }
