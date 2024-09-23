export interface Transport {
  id?: string;
  vehicleType: string;
  vehicleNumber: string;
  vehiclePhoto: File | null;
  driverPhoneNumber: number;
  transportAmount: number;
  driverName: string;
  loadingAmount: number;
  unloadingAmount: number;
  capacity: number;
  weight: number;
  weightExceeded: boolean;
}
