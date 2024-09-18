import { Category } from './category'; // Adjust import path

export interface Product {
    id?: string;
    category?: Category;
    quantity: number;
    price: number;
    totalPrice:number;
}
