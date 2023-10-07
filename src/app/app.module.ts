import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductInfoComponent } from './Components/product-info/product-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { AllOrdersComponent } from './Components/all-orders/all-orders.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule, Routes } from '@angular/router';
import { CategorySliderComponent } from './Components/category-slider/category-slider.component';
import { HomeSliderComponent } from './Components/home-slider/home-slider.component';
import { CommonModule } from '@angular/common';
import { AddHeaderInterceptor } from './Interceptors/add-header.interceptor';
import { CategoryCardComponent } from './Components/category-card/category-card.component';
import { SubCategoryCardComponent } from './Components/sub-category-card/sub-category-card.component';
import { AddToCartComponent } from './Components/add-to-cart/add-to-cart.component';
import { AddToWishlistComponent } from './Components/add-to-wishlist/add-to-wishlist.component';
import { WishlistCardComponent } from './Components/wishlist-card/wishlist-card.component';
import { WishlistListComponent } from './Components/wishlist-list/wishlist-list.component';
import { BrandCardComponent } from './Components/brand-card/brand-card.component';
import { BrandInfoComponent } from './Components/brand-info/brand-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { VerificationCodeComponent } from './Components/verification-code/verification-code.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HomeComponent,
    ProductInfoComponent,
    CartComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    CategoriesComponent,
    BrandsComponent,
    AllOrdersComponent,
    CategorySliderComponent,
    HomeSliderComponent,
    CategoryCardComponent,
    SubCategoryCardComponent,
    AddToCartComponent,
    AddToWishlistComponent,
    WishlistCardComponent,
    WishlistListComponent,
    BrandCardComponent,
    BrandInfoComponent,
    ForgetPasswordComponent,
    VerificationCodeComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    RouterModule,
    BrowserAnimationsModule,
    CommonModule,
    NgbModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
