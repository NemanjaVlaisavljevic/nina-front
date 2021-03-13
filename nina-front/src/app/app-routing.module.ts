import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRole } from './enums/UserRole';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { AuthGuard } from './_guard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'shop' , component: HomeComponent, data: {animationState: 'shop'} },
  { path: 'product/:id', component: ProductDetailComponent, data: {animationState: 'product'} },
  { path: 'logout' , component: LoginComponent },
  { path: 'register' , component: SignupComponent, data: {animationState: 'register'} },
  { path: 'profile' , component: UserEditComponent, data: {animationState: 'profile'} },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard], data: {animationState: 'order'} },
  { path: 'order/:id' , component: OrderDetailComponent, canActivate: [AuthGuard], data: {animationState: 'orderid'} },
  { path: 'cart', component: CartComponent, data: {animationState: 'cart'} },
  { path: 'admin', redirectTo: 'admin/product', pathMatch: 'full' },
  { path: 'admin/product' , component : ProductListComponent, canActivate: [AuthGuard], data: {roles: [UserRole.ADMIN], animationState: 'adminproduct'} },
  { path: 'admin/product/new' , component: ProductEditComponent, canActivate: [AuthGuard], data: {roles: [UserRole.ADMIN], animationState: 'adminproductnew'} },
  { path: 'admin/product/:id/edit' , component: ProductEditComponent, canActivate: [AuthGuard], data: {roles: [UserRole.ADMIN], animationState: 'adminproductedit'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
