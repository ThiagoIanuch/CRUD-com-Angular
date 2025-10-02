import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css'
})
export class ProductModal {
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Product>();

  productForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    description: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl('')
  });

  ngOnInit() {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value as Product);
    }
  }
}
