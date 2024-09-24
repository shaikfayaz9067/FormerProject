import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Subcategory } from '../../models/subcategory'; // Import Subcategory if not already imported

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api/products'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`).pipe(
      map((categories: Category[]) => {
        return categories.map((category) => {
          // Check for null and assign empty array if necessary
          return {
            id: category.id,
            name: category.name,
            weight: category.weight,
            // Use empty array if null
          };
        });
      })
    );
  }
  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(
      `${this.apiUrl}/categories/subcategories`
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkout(products: Product[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/checkout`, products);
  }
}
