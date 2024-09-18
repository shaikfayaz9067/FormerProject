// import { Component, OnInit } from '@angular/core';
// import { Product } from 'src/app/models/product';
// import { ProductService } from 'src/app/services/product/product.service';
// import { Category } from 'src/app/models/category'; 

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];
//   categories: Category[] = []; // To hold categories
//   newProduct: Product = {
//     category: {
//       id: '',
//       categoryName: '',
//       price: 0,
//       weight: 0
//     },

//     numOfBags: 0,
//     priceOfBags: 0,
//     totalAmount: 0
//   };
  
//   selectedCategory: Category | null = null;
//   isSubmitted = false;
//   totalAmountOfAllProducts: number = 0;

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     this.getCategories(); // Fetch categories on initialization
//   }

//   getCategories(): void {
//     this.productService.getCategories().subscribe((data: Category[]) => {
//       this.categories = data;
//     });
//   }

//   onCategoryChange(event: any): void {
//     const selectedCategoryName = event.target.value; // This is now the category name
//     const selectedCategory = this.categories.find(c => c.name === selectedCategoryName);
  
//     if (selectedCategory) {
//       this.selectedCategory = selectedCategory; 
//       this.newProduct.category = selectedCategory.name; // Store the category name
//       this.newProduct.priceOfBags = selectedCategory.price; // Update the price
//       this.newProduct.weight = selectedCategory.weight;
//       this.calculateTotalAmount(); // Update the total amount
//     } else {
//       console.error('Selected category not found');
//     }
//   }

//   addProduct(): void {
//     this.isSubmitted = true;
//     if (this.newProduct.formerName && this.newProduct.phoneNumber && this.newProduct.category && this.newProduct.priceOfBags && this.newProduct.numOfBags) {
//       this.newProduct.totalAmount = this.newProduct.numOfBags * this.newProduct.priceOfBags;
//       this.calculateTotalAmount(); 
//       this.products.push({ ...this.newProduct }); // Add product to the list
//       this.calculateTotalAmountOfAllProducts(); 
//       this.resetForm();
//     }
//   }

//   deleteProduct(id: string | undefined): void {
//     if (id) {
//       this.products = this.products.filter((product) => product.id !== id);
//     } else {
//       console.error('Product ID is undefined'); 
//     }
//   }

//   checkout(): void {
//     this.productService.checkout(this.products).subscribe(() => {
//       alert('Checkout successful!');
//       this.products = []; 
//       this.calculateTotalAmountOfAllProducts(); 
//     });
//   }

//   calculateTotalAmount(): void {
//     this.newProduct.totalAmount = this.newProduct.numOfBags * this.newProduct.priceOfBags;
//   }
//   calculateTotalAmountOfAllProducts(): void {
//     this.totalAmountOfAllProducts = this.products.reduce((sum, product) => sum + product.totalAmount, 0);
//   }

//   private resetForm(): void {
//     this.newProduct = {
//       formerName: '',
//       phoneNumber: 0,
//       category: '',
//       weight: 0,
//       numOfBags: 0,
//       priceOfBags: 0,
//       totalAmount: 0
//     };
//     this.selectedCategory = null;
//     this.isSubmitted = false;
//   }
// }
