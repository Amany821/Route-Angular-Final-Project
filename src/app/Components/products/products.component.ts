import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  userWishlist: string[] = [];

  constructor(
    private productService: ProductService,
    public wishListService: WishlistService
    ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next:(res: any) => {
        // console.log(res);
        this.products = res.data
      },
      error:(err) => {},
    });

    this.wishListService.getUserWishList().subscribe({
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

}
