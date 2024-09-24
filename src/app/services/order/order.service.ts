import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { Transport } from '../../models/transport'; // Import the Transport model

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8081/api/orders';
  private products: Product[] = [];

  // BehaviorSubject to manage Order state
  private orderState = new BehaviorSubject<Order>({
    farmerName: '',
    phoneNumber: 0,
    purchaseLocation: '',
    products: [],
    transport: [], // Ensure transport is part of the order
    totalAmountAllProducts: 0,
    purchaseDate: new Date().toISOString(),
    amountStatus: false,
    bagtype: '',
  });

  currentOrder$ = this.orderState.asObservable(); // Observable for the current order

  constructor(private http: HttpClient) {}

  // Get all orders
  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Get a single order by ID
  getOrder(id: string): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url).pipe(catchError(this.handleError));
  }

  // Post current order
  postCurrentOrder(): Observable<Order> {
    const currentOrder: Order = this.getCurrentOrder();
    console.log('Posting the following order:', JSON.stringify(currentOrder));
    return this.http
      .post<Order>(`${this.apiUrl}/create`, currentOrder)
      .pipe(catchError(this.handleError));
  }

  // Create a new order
  createOrder(order: Order): Observable<Order> {
    return this.http
      .post<Order>(`${this.apiUrl}/create`, order)
      .pipe(catchError(this.handleError));
  }

  // Create multiple orders
  createOrders(orders: Order[]): Observable<Order[]> {
    return this.http
      .post<Order[]>(`${this.apiUrl}/createAll`, orders)
      .pipe(catchError(this.handleError));
  }

  // Set products (for the current order)
  setProducts(products: Product[]): void {
    this.products = products;
    this.updateOrder({ products });
  }

  // Get products (for the current order)
  getProducts(): Product[] {
    return this.products;
  }

  // Clear products (reset products array)
  clearProducts(): void {
    this.products = [];
    this.updateOrder({ products: [] });
  }

  // Update order using BehaviorSubject
  updateOrder(newOrder: Partial<Order>): void {
    const currentOrder = this.orderState.value;
    this.orderState.next({ ...currentOrder, ...newOrder });
  }

  // Update order with transport details and post current order
  updateTransportDetailsAndPost(
    transportDetails: Transport[]
  ): Observable<Order> {
    this.updateOrder({ transport: transportDetails });
    return this.postCurrentOrder(); // Call postCurrentOrder to send the updated order
  }

  getCurrentOrder(): Order {
    return this.orderState.value;
  }

  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
