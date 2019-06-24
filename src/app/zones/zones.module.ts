import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZonesComponent } from './zones.component';
import { ZonesRoutingModule } from './zones-routing.module';
import { BoxComponent } from './box.component';

@NgModule({
  declarations: [
    ZonesComponent,
    BoxComponent
  ],
  imports: [
    CommonModule,
    ZonesRoutingModule
  ]
})
export class ZonesModule { }
