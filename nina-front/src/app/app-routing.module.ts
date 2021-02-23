import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRole } from './enums/UserRole';
import { CardComponent } from './pages/card/card.component';
import { CartComponent } from './pages/cart/cart.component';
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
  {path : '' , redirectTo: '/product' , pathMatch : 'full'},
  {path: 'product', component: CardComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'category/:id', component: CardComponent},
  {path: 'category', component: CardComponent},
  {path : 'login' , component : LoginComponent},
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
    canActivate : [AuthGuard] , data : {role : [UserRole.ADMIN]}},
  {path : 'admin/product/:id/edit' , component : ProductEditComponent ,
    canActivate : [AuthGuard] , data : {role : [UserRole.ADMIN]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
