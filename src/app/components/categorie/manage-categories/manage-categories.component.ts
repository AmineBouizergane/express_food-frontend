import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../model/page.model';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../model/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css'
})
export class ManageCategoriesComponent  implements OnInit {

  categoryPage$:Observable<Category[]> |null=null;
  categoryForm: FormGroup;
  editCategoryForm: FormGroup;

  constructor(private categoryService:CategoryService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
      
      this.categoryForm = this.fb.group({
        name: ['', Validators.required]
      });
      
      this.editCategoryForm = this.fb.group({
        name: ['', Validators.required],
      });
    
  }

  ngOnInit(): void {   
    this.getAllCategories();
  }

  getAllCategories() : void{
    this.categoryPage$ = this.categoryService.getAllCategories();
  }
  
  onDelete(categoryId: number) {
    this.categoryService.deleteCategory(categoryId)
    .subscribe(
      response => {
        console.log('Product deleted successfully:', response);       
        this.getAllCategories();  
        this.openSnackBar('The category has been deleted successfully', 'Close');
      },
      error => {
        console.error('Error deleting product:', error);
        
        this.openSnackBar('You can\'t delete this category  becouse she has an attached product', 'Close');
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

  addCategory(): void {
    if (this.categoryForm.valid) {
      const newCategory: Category = {
        categoryId: 0,
        name: this.categoryForm.value.name
      };

      this.categoryService.addCategory(newCategory).subscribe(response => {
        console.log('Category added successfully:', response);
        this.categoryForm.value.name = "";
        this.categoryForm.patchValue({
          name: "",
        });
        this.getAllCategories();
      }, error => {
        console.error('Error adding category:', error);
      });
    }
  }

  onEdit(category: Category) {
    this.editCategoryForm.patchValue({
      name: category.name,
    });
  }

  updateCategory(categoryId:number) {
    if (this.editCategoryForm.valid) {
      const updatedCategory: Category = {
        categoryId: categoryId,
        name: this.editCategoryForm.value.name
      };

      this.categoryService.editCategory(updatedCategory).subscribe(response => {
        console.log('Category has been updated successfully:', response);
        this.categoryForm.value.name = "";
        this.getAllCategories();
      }, error => {
        console.error('Error will updating category:', error);
      });
    }
  }

}
