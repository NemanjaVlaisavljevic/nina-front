import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginationComponent } from './parts/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
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
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductCardComponent } from './parts/product-card/product-card.component';
import { ProductCardDeckComponent } from './parts/product-card-deck/product-card-deck.component';
import { LoaderInterceptorService } from './_interceptors/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    SignupComponent,
    LoginComponent,
    ProductDetailComponent,
    UserEditComponent,
    CartComponent,
    OrderComponent,
    OrderDetailComponent,
    ProductListComponent,
    ProductEditComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductCardComponent,
    ProductCardDeckComponent
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
    {provide : HTTP_INTERCEPTORS , useClass : ErrorInterceptorService , multi : true},
    {provide : HTTP_INTERCEPTORS , useClass : LoaderInterceptorService , multi : true}
  ],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
