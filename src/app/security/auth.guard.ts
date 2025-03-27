import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'];
    const userRoles = this.authService.getUserRoles();
    
    if (!this.authService.isAuthenticated() || !expectedRoles.some((role: string) => userRoles.includes(role))) {
      this.router.navigate(['/login']);
      return false;
    }
    
    return true;
  }
}