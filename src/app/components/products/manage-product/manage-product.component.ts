import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../model/page.model';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { MessageResponse } from '../../../model/messageResponse.model';
import { Unite } from '../../../model/unite.model';
import { Category } from '../../../model/category.model';
import { UniteService } from '../../../services/unite.service';
import { CategoryService } from '../../../services/category.service';
import { ProductRequest } from '../../../model/productRequest.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  productPage$: Observable<Page<Product>> | null = null;
  message$: Observable<MessageResponse> | null = null;
  unit$: Observable<Unite[]> | null = null;
  category$: Observable<Category[]> | null = null;
  selectedProduct: ProductRequest | null = null;
  searchKeyword: string = '';
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(
    private productService: ProductService,
    private router: Router,
    private uniteService: UniteService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.unit$ = this.uniteService.getAllUnites();
    this.category$ = this.categoryService.getAllCategories();
  }

  loadProducts(): void {
    this.productPage$ = this.productService.getProductsByKeyword(this.searchKeyword, this.currentPage);
  }

  onSearch(): void {
    this.currentPage = 0;
    this.productPage$ = this.productService.getProductsByKeyword(this.searchKeyword, this.currentPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  onAdd() {
    this.router.navigateByUrl("/newProduct");
  }

  onDelete(productId: any) {
    this.productService.deleteProduct(productId).subscribe(
      response => {
        this.openSnackBar('The product has been deleted successfully', 'Close');
        this.loadProducts();
      },
      error => {
        console.error('Error deleting product:', error);
      }
    );
  }

  setSelectedProduct(product: Product) {
    this.selectedProduct = {
      productId: product.productId,
      name: product.name,
      imageUrl: "",
      description: product.description,
      unitPrice: product.unitPrice,
      unite: product.unite.uniteId,
      category: product.category.categoryId,
      isAvailable: product.isAvailable
    };
  }

  saveChanges() {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct).subscribe(response => {
        this.openSnackBar('The product has been updated successfully', 'Close');
        this.loadProducts();
      });
    }
  }

  clearSelectedProduct() {
    this.selectedProduct = null;
  }
}
