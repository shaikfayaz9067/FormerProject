import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product'; 
import { Category } from '../../models/category';
import { Transport } from '../../models/transport'; 
import { Order } from '../../models/order'; 
import { ProductService } from 'src/app//services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';
import { TransportService } from 'src/app/services/transport/transport.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{


  newOrder: Order = {
    farmerName: '',
    phoneNumber: 0,
    products: [],
    transport: {
      id: '',
      vehicleType: '',
      vehicleNumber: '',
      vehiclePhoto: '',
      driverPhoneNumber: 0,
    },
    totalAmountAllProducts: 0,
    purchaseDate: new Date().toISOString(),
     address:{
       country: '',
       state: '',
       city: '',
       townOrVillage: '',
       houseNumber: '',
       pinCode: 0
     }  // <-- No semicolon here, just close the object
  };
  

  newProduct: Product = {
    id: '',
    category: { id: '', name: '', price: 0, weight: 0 },
    quantity: 0,
    price: 0,
    totalPrice: 0
  };

  newAddress = {
    country: 'India',
    state: '',
    city: '',
    townOrVillage: '',
    houseNumber: '',
    pinCode: 0
  };

  categories: Category[] = []; // Populate from service
  transports: Transport[] = []; // Populate from service
  filteredTransports: Transport[] = [];
  products: Product[] = [];
  transportTypes: string[] = [];
  selectedCategory: Category | null = null;
  selectedTransportType: string = '';
  isSubmitted: boolean = false;
  totalAmountOfAllProducts: number | undefined;
  showAddressForm: boolean = false;

  // Add product to order
  constructor(
    private orderService:OrderService ,
    private productServive: ProductService, 
    private transportService:TransportService,
    private router:Router
  ){

  }
  ngOnInit() {
    this.loadCategories();
    this.loadTransports();
    this.getTransportOptions();
    
  }

  loadCategories() {
    this.productServive.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadTransports() {
    this.transportService.getTransports().subscribe(transports => {
      this.transports = transports;
    });
  }

  getTransportOptions(): void {
    this.transportService.getTransports().subscribe(transports => {
      this.transports = transports;
      this.transportTypes = [...new Set(transports.map(transport => transport.vehicleType))]; // Get distinct vehicle types
      this.filteredTransports = transports; // Initially show all transports
    });
  }

  addProduct() {
    if (this.newProduct.category) {
      this.newProduct.totalPrice = this.newProduct.quantity * this.newProduct.price;
      this.newOrder.products.push({ ...this.newProduct });
      this.calculateTotalAmount();
      this.resetProductForm();
    }
  }

  addOrder() {
    if (this.newOrder.products.length > 0 && this.newOrder.transport.vehicleType) {
      console.log('Order placed:', this.newOrder);
    } else {
      console.log('Order is missing required fields.');
    }
  }

  onCategoryChange(event: any) {
    const selectedCategoryName = event.target.value;
    this.selectedCategory = this.categories.find(category => category.name === selectedCategoryName) || null;
    if (this.selectedCategory) {
      this.newProduct.price = this.selectedCategory.price;
    }
  }

  calculateTotalAmount() {
    this.newOrder.totalAmountAllProducts = this.newOrder.products.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
  }

  onVehicleTypeChange(event: any): void {
    const selectedType = event.target.value;
    this.selectedTransportType = selectedType;
    this.filteredTransports = this.transports.filter(
      transport => transport.vehicleType === selectedType
    );
  }

  selectTransport(transport: Transport): void {
    this.newOrder.transport = transport;
  }

  resetProductForm() {
    this.newProduct = {
      id: '',
      category: { id: '', name: '', price: 0, weight: 0 },
      quantity: 0,
      price: 0,
      totalPrice: 0
    };
  }

  checkout() {
    console.log('Order Summary:', this.newOrder);

    this.orderService.createOrder(this.newOrder).subscribe(
      (response) => {
        // Order was successfully created
        console.log('Order created successfully:', response);
        this.router.navigate(['/login']); // Navigate to login page
      },
      (error) => {
        // Handle error here
        console.error('Error creating order:', error);
      }
    );
  }

  addAddress() {
    // Logic to handle address addition
    this.newOrder.address = { ...this.newAddress };
    console.log('Address:', this.newAddress);


    this.showAddressForm = false; // Hide address form after submission
  }

  deleteProduct(id: string | undefined) {
    this.newOrder.products = this.newOrder.products.filter(product => product.id !== id);
    this.calculateTotalAmount();
  }

  calculateTotalProductAmount() {
    if (this.newProduct.price && this.newProduct.quantity) {
      this.newProduct.totalPrice = this.newProduct.price * this.newProduct.quantity;
    }
  }
}
