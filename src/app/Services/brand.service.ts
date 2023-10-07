import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllBrand(): Observable<any>{
    return this.httpClient.get(`${Environment.baseUrl}brands`);
  }

  getSpecificBrand(brandId: string): Observable<any> {
    return this.httpClient.get(`${Environment.baseUrl}brands/${brandId}`);
  }
}
