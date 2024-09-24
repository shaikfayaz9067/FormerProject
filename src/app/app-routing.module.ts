import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './components/order-list/order-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AuthGuard } from './guards/auth.guard';
import { ProcurementLoginComponent } from './components/procurement-login/procurement-login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TransportComponent } from './components/transport/transport.component';

// import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/plogin', pathMatch: 'full' },
  { path: 'plogin', component: ProcurementLoginComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'transport', component: TransportComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: '**', component: ProcurementLoginComponent },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
