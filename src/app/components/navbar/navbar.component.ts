import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) {}
  logout() {
    // Clear only the session-specific data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');

    // Call AuthService's logout function (if applicable) to update the logged-in status
    this.authService.logout();

    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
