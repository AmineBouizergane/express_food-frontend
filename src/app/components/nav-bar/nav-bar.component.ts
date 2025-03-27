import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  cartItemCount: number = 0;
  constructor(private cartService: CartService, public authService : AuthService) { }

  ngOnInit(): void {
    this.updateCartItemCount();
  }

  updateCartItemCount(): void {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
