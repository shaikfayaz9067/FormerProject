import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  logout() {
    // Here, clear any session data or authentication tokens if applicable
    // For example, localStorage.clear() if you're using localStorage for session
    localStorage.clear(); // or sessionStorage.clear();

    // Navigate the user to the login page
    this.router.navigate(['/login']);
  }
}
