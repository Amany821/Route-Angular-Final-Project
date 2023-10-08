import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Interfaces/product';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  userWishlist: string[] = [];
  filterValue = "";
  
  constructor(
    private productService: ProductService,
    public wishListService: WishlistService,
    public loaderService: LoadingService
    ) {}

  ngOnInit(): void {
    this.loaderService.start()
    this.productService.getAllProducts().pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        this.products = res.data;
      },
      error:(err) => {},
    });

    this.wishListService.getUserWishList().pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        console.log(res);
        console.log(res.data.map((x: Product) => x._id));
        
        this.wishListService.userWishlist = res.data.map((x: Product) => x._id);
        // this.userWishlist = res.data.map((x: Product) => x._id);
      }
    });

    this.wishListService.isProductAddedToCart.subscribe({
      next: (res: any) => {
        debugger
          const removeTheProduct = this.wishListService.userWishlist.filter((x: any) => x !== res);
          this.wishListService.userWishlist = removeTheProduct;
      }
    });
  }

  onSearchChange(e: any) {
    this.products = this.products.filter(x =>
      x.title!.toString().toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );
  }
}
