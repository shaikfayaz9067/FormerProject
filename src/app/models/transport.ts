export interface Transport {
  id?: string;
  vehicleType: string;
  vehicleNumber: string;
  vehiclePhoto: String;
  driverPhoneNumber: number;
  transportAmount: number;
  driverName: string;
  loadingAmount: number;
  unloadingAmount: number;
  capacity: number;
  weight: number;
  weightExceeded: boolean;
}
