import { Address } from './address';
import { Product } from './product'; // Adjust import path
import { Transport } from './transport'; // Adjust import path

export interface Order {
    id?: string;
    farmerName: string;
    phoneNumber: number;
    products: Product[];
    transport: Transport;
    totalAmountAllProducts: number;
    purchaseDate: string;// Use ISO string format
    address:Address 
}
