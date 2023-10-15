import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
  @Input() productId!: string;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private wishlistService: WishlistService,
    private loaderService: LoadingService
  ) {}

  onAddProductToCart(productId: string) {
    this.loaderService.start();
    this.cartService.addProductToCart(productId).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product added successfully to your cart',
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem('userId', res.data.cartOwner);
        this.wishlistService.isProductAddedToCart.emit(productId);
      }, error:(err: any) =>{
        if(err.status == 401) {
          this.authService.logOut();
          Swal.fire({
            title: 'Session Expired',
            text: "Please Login again!",
            icon: 'warning',
            showConfirmButton: true,
          });
        }
      }
    })
  }
}
