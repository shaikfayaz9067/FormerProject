import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private userRole: string | null = null;

  constructor() {}

  // Method to set the user as logged in
  login(role: string): void {
    this.isLoggedIn = true;
    this.userRole = role; // Save the user's role
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role); // Corrected key name from 'useRole' to 'userRole'
  }

  // Method to set the user as logged out
  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole'); // Fixed typo from 'useRole' to 'userRole'
  }

  // Method to check if the user is logged in
  isAuthenticated(): boolean {
    const status = localStorage.getItem('isLoggedIn');
    return status === 'true';
  }

  hasProcurementAccess(): boolean {
    // Logic to determine if the user has access to procurement
    return this.userRole === 'procurement';
  }

  hasInventoryAccess(): boolean {
    // Logic to determine if the user has access to inventory
    return this.userRole === 'inventory';
  }
}
