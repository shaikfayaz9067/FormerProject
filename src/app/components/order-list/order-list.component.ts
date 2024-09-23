import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Transport } from '../../models/transport';
import { Order } from '../../models/order';
import { ProductService } from 'src/app//services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';
import { TransportService } from 'src/app/services/transport/transport.service';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subcategory } from 'src/app/models/subcategory';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  onFileSelected($event: Event) {
    throw new Error('Method not implemented.');
  }
  newOrder: Order = {
    farmerName: '',
    phoneNumber: 0,
    purchaseLocation: '',
    products: [],
    transport: [],
    totalAmountAllProducts: 0,
    purchaseDate: new Date().toISOString(),
    amountStatus: false,
    bagtype: '',
  };
  newProduct: Product = {
    id: '',
    category: {
      id: '',
      name: '',
      weight: 0,
      subcategories: [],
    },
    quantity: 0,
    price: 0,
    totalPrice: 0,
    subcategory: {
      // Add this line
      name: '',
      price: 0,
    },
  };

  newSubcategory: Subcategory = {
    name: '',
    price: 0,
  };

  // transportDetails: Transport = {
  //   vehicleType: '',
  //   vehicleNumber: '',
  //   vehiclePhoto: '',
  //   driverPhoneNumber: 0,
  //   driverName: '',
  // };

  categories: Category[] = []; // Populate from service
  // transports: Transport[] = []; // Populate from service
  filteredTransports: Transport[] = [];
  products: Product[] = [];
  bagtype: string[] = ['Rice Bag', 'Gunny Bag', 'Plastic Cover', 'Bage Hope'];
  // transportTypes: string[] = [];
  selectedCategory: Category | null = null;
  subcategories: Subcategory[] = [];
  // selectedTransportType: string = '';
  isSubmitted: boolean = false;
  totalAmountOfAllProducts: number | undefined;

  // showAddressForm: boolean = false;
  // addressAdded: boolean = false;
  // transportTypes: string[] = ['Bus', 'Car', 'Lorry', 'Tractor', 'Van'];

  // Add product to order
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private transportService: TransportService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadCategories();
    // this.loadTransports();
    // this.getTransportOptions();
  }

  loadCategories() {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // loadTransports() {
  //   this.transportService.getTransports().subscribe(transports => {
  //     this.transports = transports;
  //   });
  // }

  // getTransportOptions(): void {
  //   this.transportService.getTransports().subscribe((transports) => {
  //     this.transports = transports;
  //     this.transportTypes = [
  //       ...new Set(transports.map((transport) => transport.vehicleType)),
  //     ]; // Get distinct vehicle types
  //     this.filteredTransports = transports; // Initially show all transports
  //   });
  // }

  addProduct() {
    if (this.newProduct.category) {
      this.newProduct.totalPrice =
        this.newProduct.quantity * this.newProduct.price;
      this.newProduct.id = this.generateUniqueId();
      this.newOrder.products.push({ ...this.newProduct });
      this.calculateTotalAmount();
      this.resetProductForm();
    }
  }

  addOrder() {
    // Ensure the order has at least one product, a selected vehicle, and a complete address

    if (
      this.newOrder.products.length > 0
      // this.newOrder.transport.vehicleType
      // this.newOrder.address.country &&
      // this.newOrder.address.state &&
      // this.newOrder.address.city &&
      // this.newOrder.address.townOrVillage &&
      // this.newOrder.address.houseNumber &&
      // this.newOrder.address.pinCode
    ) {
      console.log('Order placed:', this.newOrder);
      this.checkout();
    } else {
      console.log('Order is missing required fields.');
    }
  }

  buyNow(product: Product) {
    this.orderService.setProducts([product]);
    this.checkout();
    this.router.navigate(['/payment']);
  }

  buyAll() {
    this.checkout();
    this.orderService.setProducts(this.newOrder.products);
    this.router.navigate(['/payment']);
  }

  onCategoryChange(event: any) {
    const selectedCategoryName = event.target.value;
    this.selectedCategory =
      this.categories.find(
        (category) => category.name === selectedCategoryName
      ) || null;

    if (this.selectedCategory) {
      this.newProduct.category = { ...this.selectedCategory };
      this.subcategories = this.newProduct.category.subcategories || []; // Ensure this is always an array
      // console.log(this.subcategories);
    } else {
      this.newProduct.price = 0; // Reset price
      this.subcategories = []; // Reset subcategories as well
    }
  }

  onSubcategoryChange(event: Event) {
    const selectedSubcategoryName = (event.target as HTMLSelectElement).value;
    // const subcategories = this.newProduct.category?.subcategories || [];// Default to empty array
    const subcategories = this.subcategories;
    console.log(subcategories);
    console.log(this.subcategories);

    if (Array.isArray(subcategories)) {
      this.newProduct.subcategory = subcategories.find(
        (sub) => sub.name === selectedSubcategoryName
      );

      if (this.newProduct.subcategory) {
        this.newProduct.price = this.newProduct.subcategory.price; // Update price based on selected subcategory
      } else {
        this.newProduct.price = 0; // Reset price if no valid subcategory is selected
      }

      this.calculateTotalProductAmount(); // Recalculate total price
    } else {
      console.error('Subcategories is not an array:', subcategories);
    }
  }

  // Method to calculate total product amount

  calculateTotalAmount() {
    const total = this.newOrder.products.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
    this.totalAmountOfAllProducts = total;
    this.newOrder.totalAmountAllProducts = total;
  }
  onTransportDetailsCompleted(vehicles: Transport[]) {
    // Iterate over the received vehicles array and push each vehicle into the newOrder's transport array
    vehicles.forEach((vehicle) => {
      this.newOrder.transport.push(vehicle);
    });

    console.log('Transport details updated in order:', this.newOrder);

    // Proceed with the order submission or further processing
    this.addOrder();
  }
  updateTotalPrice() {
    this.newProduct.totalPrice =
      this.newProduct.price * this.newProduct.quantity;
  }

  // onVehicleTypeChange(event: any): void {
  //   //   const selectedType = event.target.value;
  //   //   this.selectedTransportType = selectedType;
  //   //   this.filteredTransports = this.transports.filter(
  //   //     (transport) => transport.vehicleType === selectedType
  //   //   );
  //   const selectedType = event.target.value;
  //   this.selectedTransportType = selectedType;

  //   // Set the selected transport type in the transportDetails object
  //   this.transportDetails.vehicleType = selectedType;
  // }

  // addTransportToOrder() {
  //   if (
  //     this.transportDetails.vehicleType &&
  //     this.transportDetails.vehicleNumber &&
  //     this.transportDetails.driverPhoneNumber
  //   ) {
  //     // Assign transport details directly to the newOrder's transport object
  //     this.newOrder.transport = { ...this.transportDetails };

  //     // Optionally reset the form after submission
  //     this.resetTransportForm();

  //     console.log('Transport added to order:', this.newOrder.transport);
  //   } else {
  //     console.error('Transport details are incomplete.');
  //   }
  // }

  resetProductForm() {
    this.newProduct = {
      id: '',
      category: {
        id: '',
        name: '',
        weight: 0,
        subcategories: [],
      },
      quantity: 0,
      price: 0,
      totalPrice: 0,
      subcategory: { name: '', price: 0 }, // Reset subcategory as well
    };
  }

  // checkout() {
  //   console.log('Order Summary:', this.newOrder);

  //   this.orderService.createOrder(this.newOrder).subscribe(
  //     (response) => {
  //       // Order was successfully created
  //       console.log('Order created successfully:', response);
  //       this.router.navigate(['/login']); // Navigate to login page
  //     },
  //     (error) => {
  //       // Handle error here
  //       console.error('Error creating order:', error);
  //     }
  //   );
  // }
  checkout() {
    console.log('Order Summary:', this.newOrder);

    // Update the current order with the new order details
    this.orderService.updateOrder(this.newOrder);

    // Subscribe to get the current order value
    this.orderService.currentOrder$.subscribe((currentOrder) => {
      console.log('Order updated successfully:', currentOrder);
    });
  }

  // addAddress() {
  //   // Logic to handle address addition
  //   // this.newOrder.address = { ...this.newAddress };
  //   console.log('Address:', this.newAddress);
  //   this.addressAdded = true;

  //   this.showAddressForm = false; // Hide address form after submission
  // }

  deleteProduct(id: string | undefined) {
    this.newOrder.products = this.newOrder.products.filter(
      (product) => product.id !== id
    );
    this.calculateTotalAmount(); // Recalculate the total amount after deleting the product
  }

  calculateTotalProductAmount() {
    if (this.newProduct.price && this.newProduct.quantity) {
      this.newProduct.totalPrice =
        this.newProduct.price * this.newProduct.quantity;
    }
  }

  // resetTransportForm() {
  //   this.transportDetails = {
  //     vehicleType: '',
  //     vehicleNumber: '',
  //     vehiclePhoto: '',
  //     driverPhoneNumber: 0,
  //     driverName: '',
  //   };
  // }

  generateUniqueId(): string {
    return 'prod_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
  }
}
