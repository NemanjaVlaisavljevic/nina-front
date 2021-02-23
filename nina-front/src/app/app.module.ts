import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './parts/navigation/navigation.component';
import { PaginationComponent } from './parts/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CardComponent } from './pages/card/card.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorService } from './_interceptors/jwt-interceptor.service';
import { ErrorInterceptorService } from './_interceptors/error-interceptor.service';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PaginationComponent,
    SignupComponent,
    LoginComponent,
    CardComponent,
    ProductDetailComponent,
    UserEditComponent,
    CartComponent,
    OrderComponent,
    OrderDetailComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [CookieService ,
    {provide : HTTP_INTERCEPTORS , useClass : JwtInterceptorService , multi : true},
    {provide : HTTP_INTERCEPTORS , useClass : ErrorInterceptorService , multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
