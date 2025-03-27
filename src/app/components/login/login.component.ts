import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.redirectBasedOnRole(this.authService.getUserRoles());
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  private redirectBasedOnRole(roles: string[]): void {
    if (roles.includes('ADMIN')) {
      this.router.navigate(['/manageProducts']);
    } else if (roles.includes('CLIENT')) {
      this.router.navigate(['/products']);
    } else if (roles.includes('COOK')) {
      this.router.navigate(['/cookOrder']);
    } else if (roles.includes('DELIVERY')) {
      this.router.navigate(['/deliveryOrder']);
    } else {
      this.router.navigate(['/']);
    }
  }
}