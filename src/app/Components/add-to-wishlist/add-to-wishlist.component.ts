import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { Product } from 'src/app/Interfaces/product';
import { LoadingService } from 'src/app/Services/loading.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.scss']
})
export class AddToWishlistComponent {
  @Input() productId!: string;
  @Input() isProductAdded: boolean = false;

  constructor(
    private wishListService: WishlistService,
    private loaderService: LoadingService
  ) {}

  onAddProductToWishList(productId: string) {
    this.loaderService.start();
    this.isProductAdded = true;
    this.wishListService.addProductToWishList(productId).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        // console.log(res);
        Swal.fire({
          title: 'Success',
          text: 'Product added successfully to your wishlist',
          icon: 'success'
        });
      },error:() => {
        this.isProductAdded = false;
      }
    });
  }
}
