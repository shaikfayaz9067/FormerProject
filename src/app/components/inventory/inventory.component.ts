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
  sortDirection: { totalAmountAllProducts?: boolean; purchaseDate?: boolean } =
    {}; // Track sort direction for each column
  filteredOrders: Order[] = []; // Array to hold filtered orders
  searchTerm: string = '';

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
        this.filteredOrders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Navigate to the login page
  }

  // Sorting function
  sort(column: 'totalAmountAllProducts' | 'purchaseDate'): void {
    this.sortDirection[column] = !this.sortDirection[column]; // Toggle sort direction

    const direction = this.sortDirection[column] ? 1 : -1; // 1 for ascending, -1 for descending
    this.orders.sort((a, b) => {
      if (a[column] < b[column]) return -1 * direction;
      if (a[column] > b[column]) return 1 * direction;
      return 0;
    });
  }
  search(): void {
    this.filteredOrders = this.orders.filter((order) => {
      const nameMatch = order.farmerName
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const phoneMatch = order.phoneNumber.toString().includes(this.searchTerm);
      const dateMatch = new Date(order.purchaseDate)
        .toLocaleDateString()
        .includes(this.searchTerm);
      return nameMatch || phoneMatch || dateMatch;
    });
  }
}
