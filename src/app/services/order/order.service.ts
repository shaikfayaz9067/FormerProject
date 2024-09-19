import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';  // Import your Order model here

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8081/api/orders';  // Backend API URL

  constructor(private http: HttpClient) { }

  // Get all orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Get a single order by ID
  getOrder(id: string): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  // Create a new order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create`, order);
  }

  // Create multiple orders
  createOrders(orders: Order[]): Observable<Order[]> {
    return this.http.post<Order[]>(`${this.apiUrl}/createAll`, orders);
  }
}
