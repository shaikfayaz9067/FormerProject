import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  products: Product[] = [];
  totalAmount: number = 0;
  paymentMode: string = '';
  amountStatus: boolean = false;

  bankDetails = {
    accountNumber: '',
    ifscCode: '',
    bankName: '',
  };

  paymentCards = [
    {
      imageUrl:
        'https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png',
      cardNumber: '**** **** **** 1060',
      expiryDate: '10/16',
      name: 'Kumar',
    },
    {
      imageUrl:
        'https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png',
      cardNumber: '**** **** **** 1060',
      expiryDate: '10/16',
      name: 'Kumar',
    },
    {
      imageUrl:
        'https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png',
      cardNumber: '**** **** **** 1060',
      expiryDate: '10/16',
      name: 'Kumar',
    },
  ];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.products = this.orderService.getProducts();
    this.totalAmount = this.products.reduce(
      (acc, product) => acc + product.totalPrice,
      0
    );
  }

  onPaymentModeChange(event: any) {
    this.paymentMode = event.target.value;
  }

  submitBankTransfer() {
    console.log('Bank Transfer Details:', this.bankDetails);
    this.openSnackBar('Bank Transfer Details Submitted!', 'Close');
  }

  makePayment() {
    if (this.paymentMode === 'bank') {
      this.submitBankTransfer();
    } else {
      console.log('Payment Mode:', this.paymentMode);
    }

    // Update the amountStatus in the shared OrderService
    this.orderService.updateOrder({ amountStatus: true });

    // Show success message
    this.openSnackBar('Payment Successful! Add vehicle details.', 'Close');

    // Navigate to the vehicle component after a short delay
    setTimeout(() => {
      this.router.navigate(['/transport']); // Adjust the route to your vehicle component
    }, 2000);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
