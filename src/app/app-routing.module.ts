import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    path: 'decorators',
    loadChildren: './my-safe-decorator/my-safe-decorator.module#MySafeDecoratorModule'
  },
  {
    path: 'pipes',
    loadChildren: './my-pipes/my-pipes.module#MyPipesModule'
  },
  {
    path: 'directives',
    loadChildren: './my-directives/my-directives.module#MyDirectivesModule'
  },
  {
    path: 'lifecycles',
    loadChildren: './life-cycles/life-cycles.module#LifeCyclesModule'
  },
  {
    path: 'subscriptions',
    loadChildren: './subscriptions/subscriptions.module#SubscriptionsModule'
  },
  {
    path: 'zones',
    loadChildren: './zones/zones.module#ZonesModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
