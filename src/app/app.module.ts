import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReversePipe } from './reverse.pipe';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { numbersReducer } from './numbers.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { MyNumbersComponent } from './my-numbers/my-numbers.component';
@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    MyCounterComponent,
    MyNumbersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ numbers: numbersReducer, count: counterReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
