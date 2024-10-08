import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavbarGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const noNavbarRoutes = ['/orders', '/login', '/payment', '/transport'];

    // Remove query parameters from URL by splitting at '?'
    // const baseUrl = state.url.split('?')[0];

    // // Return true if navbar should show (i.e., the route is not in noNavbarRoutes)
    // return !noNavbarRoutes.includes(baseUrl);

    // Remove query parameters from URL by splitting at '?' and also trim trailing slashes
    const baseUrl = state.url.split('?')[0].replace(/\/$/, '');

    // Check if the current route should not display the navbar
    return !noNavbarRoutes.some((route) => baseUrl.startsWith(route));
  }
}
