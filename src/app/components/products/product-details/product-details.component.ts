import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unite } from '../../../model/unite.model';
import { Category } from '../../../model/category.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  productId!: number;
  product$:Observable<Product> | null=null;
  quantity: number = 1;

  constructor(private productService:ProductService, 
    private cartService:CartService,
    private router: Router, 
    private route: ActivatedRoute,
    private snackBar: MatSnackBar){
      
  }

  ngOnInit(): void {  
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      this.product$ = this.productService.getProductById(this.productId);
    });
  }

  increaseQuantity(): void {
    this.quantity++; // Increment quantity
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) { // Ensure quantity is not negative
      this.quantity--; // Decrement quantity
    }
  }

  addToCart(productId: number) {
    this.cartService.addItemToCartWithQty(productId, this.quantity).subscribe(
      response => {
        console.log('Product added to cart successfully:', response);
        this.openSnackBar('Product added to cart successfully', 'Close');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      error => {
        console.error('Error adding product to cart', error);
      }
    );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
