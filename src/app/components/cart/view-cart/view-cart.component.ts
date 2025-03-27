import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product.model';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../model/cart.model';
import { CartItem } from '../../../model/cartItems.model';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})
export class ViewCartComponent implements OnInit{
  cart: Cart | undefined;
  address: string = '';
  description: string = '';

  constructor(private productService: ProductService,
    private cartService: CartService,
    private orderService:OrderService,
    private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart()
      .subscribe((cart: Cart) => {
        this.cart = cart;
      }, error => {
        console.error('Error loading cart:', error);
      });
  }

  increaseQuantity(cartItem: CartItem): void {
    cartItem.qte++;
    this.updateCartItemQuantity(cartItem);
  }

  decreaseQuantity(cartItem: CartItem): void {
    if (cartItem.qte > 1) {
      cartItem.qte--;
      this.updateCartItemQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    if (!cartItem) {
      return; // If cartItem is not defined, return early
    }
  
    // Call the cart service to remove the item from the cart
    this.cartService.removeCartItem(cartItem.cardItemId)
      .subscribe(() => {
        console.log('Item removed from cart successfully');
        // Reload the cart after removing the item
        this.loadCart();
      }, error => {
        console.error('Error removing item from cart:', error);
      });
  }

  updateCartItemQuantity(cartItem: CartItem): void {
    this.cartService.changeCartItemQuantity(cartItem.cardItemId, cartItem.qte)
      .subscribe(() => {
        console.log('Cart item quantity updated successfully');
        this.loadCart();
      }, error => {
        console.error('Error updating cart item quantity:', error);
      });
  }

  calculateTotalAmount(): number {
    if (!this.cart?.cartItems?.length) {
      return 0;
    }

    let totalAmount = 0;
  
    for (const cartItem of this.cart?.cartItems) {
      // Add the product of unit price and quantity to the total amount
      totalAmount += cartItem.price * cartItem.qte;
    }
  
    return totalAmount;
  }

  getDateRange(): string {
    let currentDate = new Date();
    let startDate = new Date(currentDate.setDate(currentDate.getDate() + 2));
    let endDate = new Date(currentDate.setDate(currentDate.getDate() + 2));

    let startDateString = startDate.toLocaleDateString('en-GB');
    let endDateString = endDate.toLocaleDateString('en-GB');

    return `${startDateString} - ${endDateString}`;
  }
  
  validateOrder(): void {
    const orderResponse = {
      address: this.address,
      description: this.description,
    };
    this.orderService.makeOrder(orderResponse)
      .subscribe(() => {
        console.log('Order added successfully');
        this.loadCart();
      }, error => {
        console.error('Error will adding your order: ', error);
      });
    }
}
