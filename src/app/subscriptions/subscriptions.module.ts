import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from './subscriptions.component';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SubscriptionsComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    FormsModule
  ]
})
export class SubscriptionsModule { }
