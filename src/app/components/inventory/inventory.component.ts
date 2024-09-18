import { Component } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  orders: Order[] = [];  // Array to hold orders

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  // Fetch all orders
  getOrders(): void {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;  // Assign the fetched data to orders array
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

}
