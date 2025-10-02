import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(private httpClient: HttpClient) {}

  private apiUrl = 'http://localhost:8080/api';

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiUrl}/products/add`, product);
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/products/get`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/products/update/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/products/delete/${id}`);
  }

  getCategories() : Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/categories/get`);
  }
}
