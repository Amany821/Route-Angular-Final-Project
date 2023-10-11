import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs';
import { Product } from 'src/app/Interfaces/product';
import { LoadingService } from 'src/app/Services/loading.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  userWishlist: string[] = [];
  filterValue = "";

  constructor(
    private productService: ProductService,
    public wishListService: WishlistService,
    public loaderService: LoadingService
    ) {}

  ngOnInit(): void {
    this.loaderService.start();
    this.onGetProductDetails()
    this.onGetUserWishList()

    this.wishListService.isProductAddedToCart.subscribe({
      next: (res: any) => {
        debugger
          this.userWishlist = this.wishListService.userWishlist.filter((x: any) => x !== res);
          this.wishListService.userWishlist = this.userWishlist;
          this.wishListService.removeProductFromWishList(res).pipe(
            finalize(() => {
              this.loaderService.stop();
            })
          ).subscribe({
          next: (res: any) => {
            console.log(res);
           }
        })
      }
    });
  }

  onGetProductDetails() {
    this.productService.getAllProducts().pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        this.products = res.data;
        this.filteredProducts = res.data;
      },
      error:(err) => {},
    });
  }

  onGetUserWishList() {
    this.wishListService.getUserWishList().pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        this.wishListService.userWishlist = res.data.map((x: Product) => x._id);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products']) {
      this.filteredProducts = changes['products'].currentValue.tickets;
      this.filterValue = "";
    }
  }

  onSearchChange(e: any) {
    this.filteredProducts = this.products.filter(x =>
      x.title!.toString().toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );
  }

}
