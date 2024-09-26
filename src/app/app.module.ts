import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './components/cart/cart.component';
import { TransportComponent } from './components/transport/transport.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentComponent } from './components/payment/payment.component';
import { RPTComponent } from './components/rpt/rpt.component';
import { RawinventoryComponent } from './components/rawinventory/rawinventory.component';
import { ProcussedComponent } from './components/procussed/procussed.component';
import { ProcessedComponent } from './components/processed/processed.component';
import { ProstayComponent } from './components/prostay/prostay.component';
import { HomeInventoryComponent } from './components/home-inventory/home-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InventoryComponent,
    OrderListComponent,
    CartComponent,
    PaymentComponent,
    TransportComponent,
    RPTComponent,
    RawinventoryComponent,
    ProcussedComponent,
    ProcessedComponent,
    ProstayComponent,
    HomeInventoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
