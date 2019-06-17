import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCounterComponent } from './my-counter/my-counter.component';

const routes: Routes = [
  {
    path: 'counter',
    loadChildren: './my-counter/my-counter.module#MyCounterModule'
  },
  {
    path: 'numbers',
    loadChildren: './my-numbers/my-numbers.module#MyNumbersModule'
  },
  {
    path: 'decorator',
    loadChildren: './my-safe-decorator/my-safe-decorator.module#MySafeDecoratorModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
