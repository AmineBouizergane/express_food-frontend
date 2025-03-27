import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageProductComponent } from './components/products/manage-product/manage-product.component';
import { ManageCategoriesComponent } from './components/categorie/manage-categories/manage-categories.component';
import { ManageUnitesComponent } from './components/unite/manage-unites/manage-unites.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { CookOrdersComponent } from './components/orders/cook-orders/cook-orders.component';
import { AdminOrdersComponent } from './components/orders/admin-orders/admin-orders.component';
import { DeliveryOrdersComponent } from './components/orders/delivery-orders/delivery-orders.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ViewCartComponent } from './components/cart/view-cart/view-cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientOrdersComponent } from './components/orders/client-orders/client-orders.component';
import { ClientManagementComponent } from './components/users/client-management/client-management.component';
import { CookManagementComponent } from './components/users/cook-management/cook-management.component';
import { DeliveryManagementComponent } from './components/users/delivery-management/delivery-management.component';
import { MyAccountComponent } from './components/users/my-account/my-account.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './security/jwt.interceptor';
import { AuthGuard } from './security/auth.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsListComponent,
    HomeComponent,
    ManageProductComponent,
    ManageCategoriesComponent,
    ManageUnitesComponent,
    AddProductComponent,
    CookOrdersComponent,
    AdminOrdersComponent,
    DeliveryOrdersComponent,
    ProductDetailsComponent,
    ViewCartComponent,
    ClientOrdersComponent,
    ClientManagementComponent,
    CookManagementComponent,
    DeliveryManagementComponent,
    MyAccountComponent,
    LoginComponent,
    AccessDeniedComponent,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync(),
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor  , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
