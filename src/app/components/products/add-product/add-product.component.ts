import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unite } from '../../../model/unite.model';
import { Category } from '../../../model/category.model';
import { UniteService } from '../../../services/unite.service';
import { CategoryService } from '../../../services/category.service';
import { Page } from '../../../model/page.model';
import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';
import { ProductRequest } from '../../../model/productRequest.model';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})


export class AddProductComponent implements OnInit{

  productFormGroup?:FormGroup;
  unitOptions$:Observable<Unite[]> |null=null;
  categoryOptions$:Observable<Category[]> |null=null;
  product! : ProductRequest;
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  imageName : string = "";

  constructor(private fb : FormBuilder,
    private productService : ProductService,
    private uniteService:UniteService,
    private router:Router,
    private categoryService:CategoryService,
  private imageService : ImageService){}

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      productId:[null, Validators.required],
      name:["", Validators.required],
      description : ["", Validators.required],
      unitPrice : [0, Validators.required],
      unite :["", Validators.required],
      category : ["", Validators.required],
      isAvailable : [true, Validators.required]
    })

    this.unitOptions$ = this.uniteService.getAllUnites();
    this.categoryOptions$ = this.categoryService.getAllCategories();
  }

  onSaveProduct() {
    this.product = this.productFormGroup?.value;
    this.onUpload(this.product.name);
    this.product.imageUrl = this.imageName;
    this.productService.addProduct(this.product).subscribe(
      response => {
        this.router.navigateByUrl("/manageProducts");
        console.log('Product added successfully:', response);
      },
      error => {
        console.error('Error adding product:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload(productName : String) {
    if (!this.selectedFile) {
      alert('No file selected or the selected file is not an image.');
      return;
    }

    const uploadData = new FormData();
    this.imageName = `${productName}_${Date.now()}.${this.selectedFile.name.split('.').pop()}`;
    const renamedFile = new File([this.selectedFile], this.imageName, { type: this.selectedFile.type });

    uploadData.append('file', renamedFile);

    this.imageService.uploadImage(uploadData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.uploadProgress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response) {
        console.log('Upload complete', event.body);
      }
    });
  }
}
