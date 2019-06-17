import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySafeDecoratorComponent } from './my-safe-decorator.component';
import { MySafeDecoratorRoutingModule } from './my-safe-decorator-routing.module';


@NgModule({
  declarations: [MySafeDecoratorComponent],
  imports: [
    CommonModule,
    MySafeDecoratorRoutingModule
  ]
})
export class MySafeDecoratorModule { }
