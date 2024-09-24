import { Injectable, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private orderService:OrderService

  ) {}
 

  

}
