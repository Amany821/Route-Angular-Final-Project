import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { AddToWishlistComponent } from '../add-to-wishlist/add-to-wishlist.component';
import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/Services/product.service';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  @Input() product!: Product;
  isProductAdded!: boolean;
  @Input() userWishlist: string[] = [];
  @ViewChild('wishlist') wishlist!: AddToWishlistComponent;

  constructor(
    public wishListService: WishlistService
  ) {}
}
