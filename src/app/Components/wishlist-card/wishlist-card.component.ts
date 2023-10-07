import { Component, Input } from '@angular/core';
import { Product } from 'src/app/Interfaces/product';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss']
})
export class WishlistCardComponent {
  @Input() product!: Product;

  constructor(
    private wishListService: WishlistService
  ) {}

  onDeleteProduct(productId: string) {
    this.wishListService.removeProductFromWishList(productId).subscribe({
      next:(res: any) => {
        this.wishListService.isProductDeleted.emit(res);
      }, error:() => {}
    })
  }
}
