import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'practiceApp';
  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // List of routes where the navbar should not be shown
        const noNavbarRoutes = ['/login', '/orders', '/payment', '/transport'];

        // Remove query parameters by splitting at '?'
        const currentRoute = event.urlAfterRedirects.split('?')[0];

        // Hide navbar for specified routes
        this.showNavbar = !noNavbarRoutes.includes(currentRoute);
      }
    });
  }
}
