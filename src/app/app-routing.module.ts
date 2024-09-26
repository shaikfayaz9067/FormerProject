import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './components/order-list/order-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { InventoryComponent } from './components/inventory/inventory.component';
// Removed AuthGuard and InventoryAuthGuard imports
import { PaymentComponent } from './components/payment/payment.component';
import { TransportComponent } from './components/transport/transport.component';
import { RawinventoryComponent } from './components/rawinventory/rawinventory.component';
import { ProcussedComponent } from './components/procussed/procussed.component';
import { RPTComponent } from './components/rpt/rpt.component';
import { ProstayComponent } from './components/prostay/prostay.component';
import { HomeInventoryComponent } from './components/home-inventory/home-inventory.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },

  // Home route without auth guard
  { path: 'home', component: HomeInventoryComponent },

  // Procurement routes without auth guard
  { path: 'procussed', component: ProcussedComponent },
  { path: 'rpt', component: RPTComponent },
  { path: 'processed', component: ProcussedComponent },
  { path: 'prostay', component: ProstayComponent },

  // Orders route without auth guard
  { path: 'orders', component: OrderListComponent },

  // Payment route without auth guard
  { path: 'payment', component: PaymentComponent },

  // Transport route without auth guard
  { path: 'transport', component: TransportComponent },

  // Inventory routes without auth guard
  { path: 'rawinventory', component: RawinventoryComponent },
  { path: 'inventory', component: InventoryComponent },

  // Catch-all route
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
