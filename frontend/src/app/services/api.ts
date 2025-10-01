import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(private httpClient: HttpClient) {}

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>('http://localhost:8080/api/products/add', product);
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8080/api/products/get');
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`http://localhost:8080/api/products/update/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/api/products/delete/${id}`);
  }
}
