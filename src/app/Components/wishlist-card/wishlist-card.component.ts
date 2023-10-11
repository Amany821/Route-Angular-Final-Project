import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { Product } from 'src/app/Interfaces/product';
import { LoadingService } from 'src/app/Services/loading.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss']
})
export class WishlistCardComponent {
  @Input() product!: Product;

  constructor(
    private wishListService: WishlistService,
    public loaderService: LoadingService
  ) {}

  onDeleteProduct(productId: string) {
    this.wishListService.removeProductFromWishList(productId).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        this.wishListService.isProductDeleted.emit(res);
      }, error:() => {}
    })
  }
}
