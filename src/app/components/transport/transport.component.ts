import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Transport } from 'src/app/models/transport';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css'],
})
export class TransportComponent implements OnInit {
  vehicles: Transport[] = [];

  transportTypes: { type: string; capacity: number }[] = [
    { type: 'Truck', capacity: 10000 },
    { type: 'Van', capacity: 3000 },
    { type: 'Bike', capacity: 500 },
  ];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    // Initialize with one empty vehicle by default
    this.addVehicle(); // Call this to pre-fill with one vehicle
  }

  // Method to add a new vehicle
  addVehicle(index: number = -1) {
    // Create a new vehicle object
    const newVehicle: Transport = {
      vehicleType: '',
      vehicleNumber: '',
      driverName: '',
      driverPhoneNumber: 0, // Change to string
      transportAmount: 0,
      capacity: 0,
      weight: 0,
      weightExceeded: false,
      vehiclePhoto: '',
      loadingAmount: 0,
      unloadingAmount: 0,
    };

    // Push the new vehicle into the vehicles array
    this.vehicles.push(newVehicle);

    // Optionally reset the current vehicle form fields after submission
    if (index !== -1) {
      this.resetVehicleFields(index);
    }
  }

  // Reset fields for a specific vehicle
  resetVehicleFields(index: number) {
    this.vehicles[index].vehicleType = '';
    this.vehicles[index].vehicleNumber = '';
    this.vehicles[index].driverName = '';
    this.vehicles[index].driverPhoneNumber = 0;
    this.vehicles[index].transportAmount = 0;
    this.vehicles[index].weight = 0;
    this.vehicles[index].loadingAmount = 0;
    this.vehicles[index].unloadingAmount = 0;
    this.vehicles[index].weightExceeded = false;
    this.vehicles[index].vehiclePhoto = '';
  }

  // Handles vehicle type change
  onVehicleTypeChange(event: Event, index: number) {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      const selectedType = this.transportTypes.find(
        (transport) => transport.type === selectElement.value
      );

      if (selectedType) {
        this.vehicles[index].vehicleType = selectedType.type;
        this.vehicles[index].capacity = selectedType.capacity;
      }

      this.checkWeight(index); // Check weight whenever the vehicle type changes
    }
  }

  // Checks if the weight exceeds the vehicle capacity
  checkWeight(index: number) {
    this.vehicles[index].weightExceeded =
      this.vehicles[index].weight > this.vehicles[index].capacity;
  }

  // Complete transport details and create the order
  completeTransportDetails() {
    this.orderService.updateTransportDetailsAndPost(this.vehicles).subscribe(
      (order) => {
        console.log('Order created:', order);
        this.router.navigate(['/login']);
        // Handle successful order creation, e.g., navigate or show a success message
      },
      (error) => {
        console.error('Error creating order:', error);
        // Handle error during order creation
      }
    );
  }

  // Method to handle form submission for adding a vehicle
  addVehicleFromForm(index: number) {
    this.addVehicle(index);
    this.router.navigate(['/login']);
    // Add a new vehicle and reset the current form
  }
}
