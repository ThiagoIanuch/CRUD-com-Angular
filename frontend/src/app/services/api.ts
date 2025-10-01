import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(private httpClient: HttpClient) {}

  addProduct(product: any) {
    return this.httpClient.post('http://localhost:8080/api/products/add', product);
  }

  getProducts() {
    return this.httpClient.get('http://localhost:8080/api/products/get');
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`http://localhost:8080/api/products/delete/${id}`);
  }
}
