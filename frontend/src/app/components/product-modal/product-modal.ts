import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-modal',
  imports: [FormsModule],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css'
})
export class ProductModal {
  @Input() product: Product = { name: '', description: '', quantity: 0, price: 0 };
  @Output() save = new EventEmitter<Product>();

  onSubmit() {
    this.save.emit(this.product);
  }
}
