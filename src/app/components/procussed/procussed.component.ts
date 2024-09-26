import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-procussed',
  templateUrl: './procussed.component.html',
  styleUrls: ['./procussed.component.css'],
})
export class ProcussedComponent implements OnInit {
  orders: Order[] = []; // Holds the list of orders
  processing: any;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    // Fetch the orders from the service
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data; // Assign the fetched orders to the orders property
      // Removed the selection of any specific category
    });
  }
}
