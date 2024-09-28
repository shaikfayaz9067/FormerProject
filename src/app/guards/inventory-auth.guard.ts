import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this.authService.isAuthenticated() &&
      this.authService.hasInventoryAccess()
    ) {
      return true;
    } else {
      // this.router.navigate(['/home']); // Redirect unauthorized users
      return false;
    }
  }
}
