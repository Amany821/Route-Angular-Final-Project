import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CartComponent } from './Components/cart/cart.component';
import { AllOrdersComponent } from './Components/all-orders/all-orders.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AuthGuard } from './Guards/auth.guard';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { WishlistListComponent } from './Components/wishlist-list/wishlist-list.component';
import { VerificationCodeComponent } from './Components/verification-code/verification-code.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'verification-code', component: VerificationCodeComponent},
  {path: 'rest-password', component: ResetPasswordComponent},

  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: 'cart', canActivate: [AuthGuard], component: CartComponent},
  {path: 'allorders', canActivate: [AuthGuard], component: AllOrdersComponent},
  {path: 'products', canActivate: [AuthGuard], component: ProductsComponent},
  {path: 'product/:id', canActivate: [AuthGuard], component: ProductDetailsComponent},
  {path: 'categories', canActivate: [AuthGuard], component: CategoriesComponent},
  {path: 'brands', canActivate: [AuthGuard], component: BrandsComponent},
  {path: 'wishlist', canActivate: [AuthGuard], component: WishlistListComponent},
  {path: 'check-out/:cartId', canActivate: [AuthGuard], component: CheckoutComponent},
  
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
