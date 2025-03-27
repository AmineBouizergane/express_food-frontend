import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model/product.model';
import { Observable } from "rxjs";
import { Page } from '../../../model/page.model';
import { Category } from '../../../model/category.model';
import { CategoryService } from '../../../services/category.service';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productPage$: Observable<Page<Product>> | null = null;
  categoryList$: Observable<Category[]> | null = null;
  selectedCategoryId: number | null = null;
  searchKeyword: string = '';
  currentPage: number = 0;
  @Output() addToCartClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private cartService: CartService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    if (this.selectedCategoryId) {
      this.productPage$ = this.productService.getAvailableProductsByCategory(this.selectedCategoryId, this.currentPage);
    } else {
      this.productPage$ = this.productService.getAvailableProducts(this.currentPage);
    }
  }

  loadCategories(): void {
    this.categoryList$ = this.categoryService.getAllCategories();
  }

  selectCategory(categoryId: number| null): void {     
    this.selectedCategoryId = categoryId;
    this.searchKeyword = '';
    this.currentPage = 0; // Reset to first page when category changes
    this.loadProducts();
  }

  searchProducts(): void {  
    this.productPage$ = this.productService.searchProducts(this.searchKeyword, this.selectedCategoryId);
  }

  addToCart(productId: number): void {    
    this.cartService.addItemToCart(productId).subscribe(
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

  productDetails(productId: number): void {
    // Implement product details functionality
  }

  editProduct(p: Product): void {
    // Implement edit product functionality
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.productPage$) {
      this.productPage$.pipe(
        map((page: Page<Product>) => page.totalPage) // Use arrow function to specify the type of page
      ).subscribe((totalPages: number) => { // Specify the type of totalPages
        if (totalPages && this.currentPage < totalPages) {
          this.currentPage++;
          this.loadProducts();
        }
      });
    }
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadProducts();
  }

  generatePageNumbers(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index );
  }
}
