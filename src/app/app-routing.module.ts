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
import { ProcurementAuthGuard } from './guards/procurement-auth.guard';
import { InventoryAuthGuard } from './guards/inventory-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [ProcurementAuthGuard],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    // canActivate: [ProcurementAuthGuard],
  },
  {
    path: 'transport',
    component: TransportComponent,
    canActivate: [ProcurementAuthGuard],
  },

  // Home route without auth guard
  {
    path: 'home',
    component: HomeInventoryComponent,
    canActivate: [NavbarGuard, InventoryAuthGuard],
  },

  // Procurement routes without auth guard
  {
    path: 'procussed',
    component: ProcussedComponent,
    canActivate: [NavbarGuard, InventoryAuthGuard],
  },
  {
    path: 'rpt',
    component: RPTComponent,
    canActivate: [NavbarGuard, InventoryAuthGuard],
  },
  {
    path: 'processed',
    component: ProcessedComponent,
    canActivate: [NavbarGuard, InventoryAuthGuard],
  },
  {
    path: 'prostay',
    component: ProstayComponent,
    canActivate: [NavbarGuard, InventoryAuthGuard],
  },

  {
    path: 'rawinventory',
    component: RawinventoryComponent,
    canActivate: [NavbarGuard, InventoryAuthGuard],
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [NavbarGuard, InventoryAuthGuard],
  },

  // Catch-all route
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
