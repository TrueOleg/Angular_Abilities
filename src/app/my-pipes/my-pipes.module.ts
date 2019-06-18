import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPipesComponent } from './my-pipes.component';
import { MyPipesRoutingModule } from './my-pipes-routing.module';
import { SqrtPipe } from '../helpers/pipes';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SqrtPipe,
    MyPipesComponent
  ],
  imports: [
    CommonModule,
    MyPipesRoutingModule,
    FormsModule
  ]
})
export class MyPipesModule { }
