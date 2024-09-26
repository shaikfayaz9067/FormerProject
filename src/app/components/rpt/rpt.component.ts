import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rpt',
  templateUrl: './rpt.component.html',
  styleUrls: ['./rpt.component.css'],
})
export class RPTComponent implements OnInit {
  order: any;
  selectedCategory: string | undefined;

  ngOnInit() {
    this.order = {
      farmerName: 'fayaz shaik',
      phoneNumber: 6767676676,
      products: [
        {
          _id: 'prod_1727265312333_865',
          category: {
            _id: '66f296adf1b23d2918693daf',
            name: 'Wheat',
            weight: 100,
          },
          subcategory: { name: 'Wheat', subname: 'Red Wheat' },
          price: 130,
          quantity: 5,
          totalPrice: 650,
        },
      ],
      transport: [
        {
          vehicleType: 'Van',
          vehicleNumber: 'TS07he9909',
          driverPhoneNumber: 9000989808,
          driverName: 'juresh',
          transportAmount: 6,
          loadingAmount: 7,
          unloadingAmount: 7,
        },
      ],
      totalAmountAllProducts: 650,
      purchaseLocation: 'Munagala',
      amountStatus: true,
      bagtype: 'Rice Bag',
    };

    this.selectedCategory = this.order.products[0]?.category.name;
  }
}
