import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Interfaces/product';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { finalize } from 'rxjs';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  userWishlist: string[] = [];
  filterValue = "";
  
  constructor(
    private productService: ProductService,
    public wishListService: WishlistService,
    public loaderService: LoadingService,
    public cartService: CartService
    ) {}

  ngOnInit(): void {
    this.loaderService.start();

    this.onGetAllProducts();
    this.onGetUserWishlist();
    this.onGetUserCart();

    this.wishListService.isProductAddedToCart.subscribe({
      next: (res: any) => {
        debugger
          const removeTheProduct = this.wishListService.userWishlist.filter((x: any) => x !== res);
          this.wishListService.userWishlist = removeTheProduct;
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

  onGetAllProducts(){
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

  onGetUserWishlist() {
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
  }

  onGetUserCart() {
    this.cartService.getUserCartProducts().pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        this.cartService.numOfCartItems.next(res.numOfCartItems);
      }
    });
  }
}