import { Category } from './category'; // Adjust import path
import { Subcategory } from './subcategory';

export interface Product {
  id?: string;
  category?: Category;
  subcategory?: Subcategory;
  quantity: number;
  price: number;
  totalPrice: number;
}
