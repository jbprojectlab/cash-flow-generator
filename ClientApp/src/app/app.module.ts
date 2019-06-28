import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoansComponent } from './loans/loans.component';
import { MonthlyCashFlowsComponent } from './monthly-cash-flows/monthly-cash-flows.component';

@NgModule({
  declarations: [
    AppComponent,
    LoansComponent,
    MonthlyCashFlowsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
