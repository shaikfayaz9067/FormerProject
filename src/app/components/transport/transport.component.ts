import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Transport } from 'src/app/models/transport';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css'],
})
export class TransportComponent implements OnInit {
  vehicles: Array<Transport> = [
    {
      vehicleType: '',
      vehicleNumber: '',
      driverName: '',
      driverPhoneNumber: 0,
      transportAmount: 0,
      capacity: 0,
      weight: 0,
      weightExceeded: false,
      vehiclePhoto: null,
      loadingAmount: 0,
      unloadingAmount: 0,
    },
  ];

  transportTypes: { type: string; capacity: number }[] = [
    { type: 'Truck', capacity: 10000 },
    { type: 'Van', capacity: 3000 },
    { type: 'Bike', capacity: 500 },
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  // When the vehicle type is changed, update the vehicle capacity and reset the weight validation
  onVehicleTypeChange(event: Event, i: number) {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      const selectedType = this.transportTypes.find(
        (transport) => transport.type === selectElement.value
      );

      if (selectedType) {
        this.vehicles[i].vehicleType = selectedType.type;
        this.vehicles[i].capacity = selectedType.capacity;
      }

      // Reset the weight validation
      this.checkWeight(i);
    }
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      this.vehicles[index].vehiclePhoto = file; // Assign the selected file to the vehicle
    }
  }

  // Check if entered weight exceeds the capacity of the selected vehicle
  checkWeight(i: number) {
    this.vehicles[i].weightExceeded =
      this.vehicles[i].weight > this.vehicles[i].capacity;
  }

  // Add transport details to the order and update the shared order state
  addTransportToOrder(i: number) {
    this.checkWeight(i);
    if (!this.vehicles[i].weightExceeded) {
      console.log('Vehicle added:', this.vehicles[i]);

      // Update the OrderService with the new transport details
      this.orderService.updateOrder({ transport: this.vehicles });
    }
  }

  // Complete transport details and update the shared order
  completeTransportDetails() {
    this.orderService.updateOrder({ transport: this.vehicles });
    console.log('Transport details completed and added to the order.');
  }
}
