import { Category } from './category'; // Adjust import path
import { Subcategory } from './subcategory';

export interface Product {
  id: string;
  category: {
    id: string;
    name: string;
    weight: number; // Ensure this is an array of Subcategory objects
  };
  quantity: number;
  price: number;
  totalPrice: number;
  subcategory: {
    name: string;
    subname: string;
    price: number;
  };
}
