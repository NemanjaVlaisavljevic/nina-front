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
  { path: 'register' , component: SignupComponent },
  { path: 'profile' , component: UserEditComponent },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'order/:id' , component: OrderDetailComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, data: {animationState: 'cart'} },
  { path: 'admin', redirectTo: 'admin/product', pathMatch: 'full' },
  { path: 'admin/product' , component : ProductListComponent, canActivate: [AuthGuard], data: {roles: [UserRole.ADMIN]} },
  { path: 'admin/product/new' , component: ProductEditComponent, canActivate: [AuthGuard], data: {roles: [UserRole.ADMIN]} },
  { path: 'admin/product/:id/edit' , component: ProductEditComponent, canActivate: [AuthGuard], data: {roles: [UserRole.ADMIN]} }

  /* {path: 'product/:id', component: ProductDetailComponent},
  {path : 'logout' , component : LoginComponent},
  {path : 'register' , component : SignupComponent},
  {path : 'profile' , component : UserEditComponent , canActivate : [AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path : 'order/:id' , component : OrderDetailComponent , canActivate : [AuthGuard]},
  {path: 'cart', component: CartComponent},
  {path: 'admin', redirectTo: 'admin/product', pathMatch: 'full'},
  {path : 'admin/product' , component : ProductListComponent ,
   canActivate : [AuthGuard], data: {roles: [UserRole.ADMIN]}},
  {path : 'admin/product/new' , component : ProductEditComponent ,
    canActivate : [AuthGuard] , data : {roles : [UserRole.ADMIN]}},
  {path : 'admin/product/:id/edit' , component : ProductEditComponent ,
    canActivate : [AuthGuard] , data : {roles : [UserRole.ADMIN]}} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
