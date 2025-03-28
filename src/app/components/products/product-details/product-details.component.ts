import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FeedBackService} from "../../../services/feedBack.service";
import {FeedBack} from "../../../model/feedBack.model";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  productId!: number;
  product$:Observable<Product> | null=null;
  quantity: number = 1;
  newReview: any = {
    rating: 5,
    comment: ''
  };

  constructor(private productService:ProductService,
    private cartService:CartService,
    private feedBackService:FeedBackService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      this.product$ = this.productService.getProductById(this.productId);
    });
  }

  submitReview(): void {
    const reviewData: FeedBack = {
      rating: this.newReview.rating,
      comment: this.newReview.comment
    };

    this.feedBackService.addFeedBack(reviewData, this.productId).subscribe(
      () => {
        window.location.reload();
      },
      error => {
        console.error('Error submitting review:', error);
      }
    );
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

  hoveredRating = 0;

  hoverRating(star: number) {
    this.hoveredRating = star;
  }

  resetHover() {
    this.hoveredRating = 0;
  }

  setRating(star: number) {
    this.newReview.rating = star;
  }

}
