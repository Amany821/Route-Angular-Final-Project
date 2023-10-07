import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private httpClient: HttpClient
    ) { }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${Environment.baseUrl}products`)
  }

  getProductDetails(productId: string): Observable<any> {
    return this.httpClient.get(`${Environment.baseUrl}products/${productId}`)
  }
}
