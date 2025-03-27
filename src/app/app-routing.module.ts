import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { HomeComponent } from './components/home/home.component';
import { ManageProductComponent } from './components/products/manage-product/manage-product.component';
import { ManageCategoriesComponent } from './components/categorie/manage-categories/manage-categories.component';
import { ManageUnitesComponent } from './components/unite/manage-unites/manage-unites.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { AdminOrdersComponent } from './components/orders/admin-orders/admin-orders.component';
import { CookOrdersComponent } from './components/orders/cook-orders/cook-orders.component';
import { DeliveryOrdersComponent } from './components/orders/delivery-orders/delivery-orders.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ViewCartComponent } from './components/cart/view-cart/view-cart.component';
import { ClientOrdersComponent } from './components/orders/client-orders/client-orders.component';
import { ClientManagementComponent } from './components/users/client-management/client-management.component';
import { CookManagementComponent } from './components/users/cook-management/cook-management.component';
import { DeliveryManagementComponent } from './components/users/delivery-management/delivery-management.component';
import { MyAccountComponent } from './components/users/my-account/my-account.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ADMIN', 'CLIENT', 'COOK', 'DELIVERY'] }},
  { path: 'products', component: ProductsListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['CLIENT'] }},
  { path: 'productDetails/:productId', component: ProductDetailsComponent, canActivate: [AuthGuard], data: { expectedRoles: ['CLIENT'] } },
  { path: 'manageProducts', component: ManageProductComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ADMIN'] }},
  { path: 'newProduct', component: AddProductComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ADMIN'] }},
  { path: 'adminOrder', component: AdminOrdersComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ADMIN'] }},
  { path: 'cookOrder', component: CookOrdersComponent, canActivate: [AuthGuard], data: { expectedRoles: ['COOK'] }},
  { path: 'deliveryOrder', component: DeliveryOrdersComponent, canActivate: [AuthGuard], data: { expectedRoles: ['DELIVERY'] }},
  { path: 'clientOrders', component: ClientOrdersComponent, canActivate: [AuthGuard], data: { expectedRoles: ['CLIENT'] }},
  { path: 'manageCategories', component: ManageCategoriesComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ADMIN'] }},
  { path: 'manageUnites', component: ManageUnitesComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ADMIN'] }},
  { path: 'cart', component: ViewCartComponent, canActivate: [AuthGuard], data: { expectedRoles: ['CLIENT'] }},
  { path: 'clientMangement', component: ClientManagementComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ADMIN'] }},
  { path: 'cookMangement', component: CookManagementComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ADMIN'] }},
  { path: 'deliveryManagement', component: DeliveryManagementComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ADMIN'] }},
  { path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard], data: { expectedRoles: ['CLIENT', 'COOK', 'DELIVERY'] }},
  { path: '403', component: AccessDeniedComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
