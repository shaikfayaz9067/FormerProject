import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api/products'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<{ categoryName: string; price: string; id: string ; weight:number}[]>(`${this.apiUrl}/categories`).pipe(
      map(categories => categories.map(category => ({
        id: category.id,                      // Assuming 'id' exists in the backend response
        name: category.categoryName,           // Map 'categoryName' to 'name'
        price: Number(category.price),        // Convert 'price' from string to number
        weight:Number(category.weight)
      })))
    );
  }
  
  

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkout(products: Product[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/checkout`, products);
  }
}
