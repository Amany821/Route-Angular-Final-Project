import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingAddress } from '../Interfaces/payment';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUserOrders(userId: string): Observable<any> {
    return this.httpClient.get(`${Environment.baseUrl}orders/user/${userId}`);
  }

  createCashOrder(cartId: string, shippingAddress: ShippingAddress): Observable<any> {
    return this.httpClient.post(`${Environment.baseUrl}orders/checkout-session/${cartId}?url=http://localhost:4200`, shippingAddress, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    });
  }
}
