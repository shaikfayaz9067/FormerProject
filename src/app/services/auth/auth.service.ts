import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() {}

  // Method to set the user as logged in
  login(): void {
    this.loggedIn = true;
    localStorage.setItem('isLoggedIn', 'true'); // Save login status to local storage
  }

  // Method to set the user as logged out
  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  // Method to check if the user is logged in
  isAuthenticated(): boolean {
    const status = localStorage.getItem('isLoggedIn');
    return status === 'true';
  }
}
