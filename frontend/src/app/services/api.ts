import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get('http://localhost:8080/api/products/get');
  }
}
