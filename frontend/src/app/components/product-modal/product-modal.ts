import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css'
})
export class ProductModal {
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  productForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    quantity: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required)
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
    else {
      this.productForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
