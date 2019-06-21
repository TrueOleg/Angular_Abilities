import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifeCyclesComponent } from './life-cycles.component';
import { LifeCyclesRoutingModule } from './life-cycles-routing.module';
import { FormsModule } from '@angular/forms';
import { LifeCyclesChildComponent } from './life-cycles-child/life-cycles-child.component';
import { LifeCyclesChildWithDetectChangesComponent } from './life-cycles-child-with-detect-changes/life-cycles-child-with-detect-changes.component';

@NgModule({
  declarations: [LifeCyclesComponent, LifeCyclesChildComponent, LifeCyclesChildWithDetectChangesComponent],
  imports: [
    CommonModule,
    LifeCyclesRoutingModule,
    FormsModule
  ]
})
export class LifeCyclesModule { }
