import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-rpt',
  templateUrl: './rpt.component.html',
  styleUrls: ['./rpt.component.css'],
})
export class RPTComponent implements OnInit {
  order: any;
  selectedCategory: string | undefined;
  orders: Order[] = [];
processing: any;

  constructor(private orderService:OrderService) { 

  }

  ngOnInit() {
  
    this.orderService.getOrders().subscribe((data) => { 
      this.orders = data;
    })
    

    this.selectedCategory = this.order.products[0]?.category.name;
  }
}
