import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  orders: Order[] = []; // Array to hold orders

  constructor(
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  // Fetch all orders
  getOrders(): void {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data; // Assign the fetched data to orders array
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  onLogout(): void {
    // Clear any stored authentication data or tokens if necessary
    // For example: this.loginService.logout();
    this.authService.logout();

    this.router.navigate(['/login']); // Navigate to the login page
  }
}
