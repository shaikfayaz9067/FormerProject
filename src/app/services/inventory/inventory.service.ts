import { Injectable, OnInit } from '@angular/core';
import { OrderService } from '../order/order.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private orderService:OrderService

  ) {}
 

  

}
