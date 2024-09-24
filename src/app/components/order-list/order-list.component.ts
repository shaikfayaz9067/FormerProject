import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Category } from 'src/app/models/category';
import { Transport } from '../../models/transport';
import { Order } from '../../models/order';
import { ProductService } from 'src/app/services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';
import { TransportService } from 'src/app/services/transport/transport.service';
import { Router } from '@angular/router';
import { Subcategory } from 'src/app/models/subcategory';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
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
    },
    quantity: 0,
    price: 0,
    totalPrice: 0,
    subcategory: {
      name: '',
      subname: '',
      price: 0,
    },
  };

  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  filteredSubcategories: Subcategory[] = [];
  filteredTransports: Transport[] = [];
  isSubmitted: boolean = false;
  totalAmountOfAllProducts: number | undefined;
  bagtype: string[] = ['Rice Bag', 'Gunny Bag', 'Plastic Cover', 'Bage Hope'];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private transportService: TransportService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadSubcategories();
  }

  loadCategories() {
    this.productService.getCategories().subscribe((categories) => {
      console.log('Fetched categories:', categories); // Log the fetched categories
      this.categories = categories;
    });
  }

  loadSubcategories() {
    this.productService.getSubcategories().subscribe((subcategories) => {
      console.log('Fetched subcategories:', subcategories);
      this.subcategories = subcategories;
    });
  }

  onCategoryChange(event: any) {
    const selectedCategoryName = event.target.value;
    const selectedCategory = this.categories.find(
      (category) => category.name === selectedCategoryName
    );

    if (selectedCategory) {
      this.newProduct.category = {
        id: selectedCategory.id || '', // Ensure id is required and correctly assigned
        name: selectedCategory.name,
        weight: selectedCategory.weight,
      };

      // Filter subcategories based on selected category name
      this.filteredSubcategories = this.subcategories.filter(
        (sub) => sub.name === selectedCategory.name
      );
    } else {
      this.newProduct.price = 0;
      this.filteredSubcategories = [];
    }
  }

  onSubcategoryChange(event: Event) {
    const selectedSubcategoryName = (event.target as HTMLSelectElement).value;
    if (Array.isArray(this.filteredSubcategories)) {
      const foundSubcategory = this.filteredSubcategories.find(
        (sub) => sub.name === selectedSubcategoryName
      );

      this.newProduct.subcategory = foundSubcategory || {
        name: '',
        subname: '',
        price: 0,
      };
      this.newProduct.price = this.newProduct.subcategory.price || 0;
      this.calculateTotalProductAmount(); // Calculate total price
    } else {
      console.error(
        'Filtered subcategories is not an array:',
        this.filteredSubcategories
      );
    }
  }

  addProduct() {
    if (this.newProduct.category && this.newProduct.subcategory) {
      this.newProduct.totalPrice =
        this.newProduct.quantity * this.newProduct.price;
      this.newProduct.id = this.generateUniqueId();

      this.newOrder.products.push({
        id: this.newProduct.id, // Ensure id is defined
        category: {
          id: this.newProduct.category.id || '', // Provide a default or handle accordingly
          name: this.newProduct.category.name,
          weight: this.newProduct.category.weight,
        },
        quantity: this.newProduct.quantity,
        price: this.newProduct.price,
        totalPrice: this.newProduct.totalPrice,
        subcategory: {
          name: this.newProduct.subcategory.name,
          subname: this.newProduct.subcategory.subname,
          price: this.newProduct.subcategory.price,
        },
      });

      this.calculateTotalAmount();
      this.resetProductForm();
    } else {
      console.log('Please select a valid category and subcategory');
    }
  }
  buyNow(product: Product) {
    this.orderService.setProducts(this.newOrder.products);
    this.addProduct();
    this.checkout();
    this.router.navigate(['/payment']);
  }

  buyAll() {
    this.addProduct();
    this.checkout();

    this.orderService.setProducts(this.newOrder.products);
    this.router.navigate(['/payment']);
  }

  calculateTotalProductAmount() {
    if (this.newProduct.price && this.newProduct.quantity) {
      this.newProduct.totalPrice =
        this.newProduct.price * this.newProduct.quantity;
    }
  }

  calculateTotalAmount() {
    const total = this.newOrder.products.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
    this.totalAmountOfAllProducts = total;
    this.newOrder.totalAmountAllProducts = total;
  }

  resetProductForm() {
    this.newProduct = {
      id: '',
      category: {
        id: '',
        name: '',
        weight: 0,
      },
      quantity: 0,
      price: 0,
      totalPrice: 0,
      subcategory: { name: '', subname: '', price: 0 },
    };
  }
  checkout() {
    console.log('Order Summary:', this.newOrder);
    this.orderService.updateOrder(this.newOrder);
    this.orderService.currentOrder$.subscribe((currentOrder) => {
      console.log('Order updated successfully:', currentOrder);
    });
  }

  generateUniqueId(): string {
    return 'prod_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
  }
  // Remaining methods for adding orders and handling checkout
}
