import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  constructor(private api: Api) {}

  products: any[] = [];

  ngOnInit() {
    this.api.getProducts().subscribe(data => {
      this.products = data as any[];
    })
  }
}
