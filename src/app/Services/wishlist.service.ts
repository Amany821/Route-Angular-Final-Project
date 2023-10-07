import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment';
import { Product } from '../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  userWishlist: any;
  isProductDeleted = new EventEmitter<Product>();
  isProductAddedToCart = new EventEmitter<string>();

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserWishList(): Observable<any> {
    return this.httpClient.get(`${Environment.baseUrl}wishlist`, {
      headers: {
        token: localStorage.getItem('userToken')!
      }
    })
  }

  addProductToWishList(productId: string): Observable<any> {
    return this.httpClient.post(`${Environment.baseUrl}wishlist/`, {productId}, {
      headers:{
        token: localStorage.getItem('userToken')!
      }
    })
  }

  removeProductFromWishList(productId: string): Observable<any> {
    return this.httpClient.delete(`${Environment.baseUrl}wishlist/${productId}`, {
      headers: {
        token: localStorage.getItem('userToken')!
      }
    })
  }
}
