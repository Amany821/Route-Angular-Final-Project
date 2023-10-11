import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  numOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private httpClient: HttpClient
  ) {
    // if(localStorage.getItem('userToken')) {
    //   this.getUserCartProducts().subscribe((res) => {
    //     this.numOfCartItems.next(res.numOfCartItems);
    //   });
    // }
   }

  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(`${Environment.baseUrl}cart`, {
      productId
    }, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    });
  }

  getUserCartProducts(): Observable<any> {
    return this.httpClient.get(`${Environment.baseUrl}cart`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    });
  }

  removeCartSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.delete(`${Environment.baseUrl}cart/${productId}`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    });
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete(`${Environment.baseUrl}cart`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    });
  }

  updateCartProductQuantity(productId: string, count: number): Observable<any> {
    return this.httpClient.put(`${Environment.baseUrl}cart/${productId}`, {count}, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    });
  }
}
