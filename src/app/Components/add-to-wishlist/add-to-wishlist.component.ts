import { Component, Input } from '@angular/core';
import { Product } from 'src/app/Interfaces/product';
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
    private wishListService: WishlistService
  ) {}

  onAddProductToWishList(productId: string) {
    this.isProductAdded = true;
    this.wishListService.addProductToWishList(productId).subscribe({
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
