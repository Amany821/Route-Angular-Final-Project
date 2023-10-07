import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
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
  ) {}

  onAddProductToCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe({
      next:(res: any) => {
        // console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product added successfully to your cart',
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem('userId', res.data.cartOwner);
        this.cartService.numOfCartItems.next(res.numOfCartItems);
        this.wishlistService.isProductAddedToCart.emit(productId);
        this.wishlistService.removeProductFromWishList(productId).subscribe({
          next:() => {}
        })
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
