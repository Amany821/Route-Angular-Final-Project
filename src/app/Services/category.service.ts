import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    constructor(
    private httpClient: HttpClient
  ) { }

  getAllCategories(): Observable<any>{
    return this.httpClient.get(`${Environment.baseUrl}categories`)
  }

  getAllSubCategoriesOnCategory(categoryId: string) : Observable<any>{
    return this.httpClient.get(`${Environment.baseUrl}categories/${categoryId}/subcategories`)
  }
}
