import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/product';
import { WishlistService } from 'src/app/Services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.scss']
})
export class WishlistListComponent implements OnInit{
  wishListProducts: Product[] = [];
  constructor(
    private wishListService: WishlistService
  ) {}

  ngOnInit(): void {
    this.wishListService.getUserWishList().subscribe({
      next:(res: any) => {
        this.wishListProducts = res.data
        // console.log(res);
      },error:() => {}
    });

    this.wishListService.isProductDeleted.subscribe({
      next: (res: any) => {
        // console.log(res);
        Swal.fire({
          title: 'Success',
          text: 'Product removed successfully from your wishlist',
          icon: 'success'
        })
        const filteredArray = this.wishListProducts.filter(obj => res.data.includes(obj.id));
        this.wishListProducts = filteredArray;
      }
    });

    this.wishListService.isProductAddedToCart.subscribe({
      next:(res: any) => {
        // console.log(res);
        const filteredArray = this.wishListProducts.filter(obj => obj._id !== res);
        this.wishListService.removeProductFromWishList(res).subscribe({
          next:() => {}
        })
        // console.log(filteredArray);
        this.wishListProducts = filteredArray;
      }
    });
  }
}
