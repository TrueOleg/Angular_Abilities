import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDirectivesComponent } from './my-directives.component';
import { MyDirectivesRoutingModule } from './my-directives-routing.module';
import { HighlightDirective } from '../helpers/directives';

@NgModule({
  declarations: [
    HighlightDirective,
    MyDirectivesComponent],
  imports: [
    CommonModule,
    MyDirectivesRoutingModule
  ]
})
export class MyDirectivesModule { }
