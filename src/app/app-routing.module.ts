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
import { NavbarGuard } from './guards/navbar.guard';
import { ProcessedComponent } from './components/processed/processed.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'transport', component: TransportComponent },

  // Home route without auth guard
  {
    path: 'home',
    component: HomeInventoryComponent,
    canActivate: [NavbarGuard],
  },

  // Procurement routes without auth guard
  {
    path: 'procussed',
    component: ProcussedComponent,
    canActivate: [NavbarGuard],
  },
  { path: 'rpt', component: RPTComponent, canActivate: [NavbarGuard] },
  {
    path: 'processed',
    component: ProcessedComponent,
    canActivate: [NavbarGuard],
  },
  { path: 'prostay', component: ProstayComponent, canActivate: [NavbarGuard] },

  {
    path: 'rawinventory',
    component: RawinventoryComponent,
    canActivate: [NavbarGuard],
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [NavbarGuard],
  },

  // Catch-all route
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
