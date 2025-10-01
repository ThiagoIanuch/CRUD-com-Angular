import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  imports: [FormsModule],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css'
})
export class ProductModal {
  @Input() product: any = { name: '', description: '', quantity: 0, price: 0 };
  @Output() save = new EventEmitter<any>();

  onSubmit() {
    this.save.emit(this.product);
  }
}
