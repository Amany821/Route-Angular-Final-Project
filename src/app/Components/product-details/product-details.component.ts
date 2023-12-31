import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddToWishlistComponent } from '../add-to-wishlist/add-to-wishlist.component';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  productId: string = "";
  productDetails!: Product;
  userWishlist: string[] = [];
  @ViewChild('wishlist') wishlist!: AddToWishlistComponent;
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    autoplay: true
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public wishListService: WishlistService,
    public loaderService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loaderService.start();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id') || ""
    });
    this.onGetProductDetails();
    this.onGetUserWishList();
    this.wishListService.isProductAddedToCart.subscribe({
      next: (res: any) => {
        //debugger
          const removeTheProduct = this.wishListService.userWishlist.filter((x: any) => x !== res);
          this.wishListService.userWishlist = removeTheProduct;
      }
    });
  }

  onGetProductDetails() {
    this.productService.getProductDetails(this.productId).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next: (res: any) => {
        this.productDetails = res.data;
        // console.log(res.data);
      }, error: () => {
      }
    });
  }

  onGetUserWishList() {
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
}
