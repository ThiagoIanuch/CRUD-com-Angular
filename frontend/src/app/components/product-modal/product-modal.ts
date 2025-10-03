import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { Category } from '../../interfaces/category';
import { Api } from '../../services/api';

@Component({
  selector: 'app-product-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css'
})
export class ProductModal {
  constructor(private api: Api) {}

  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();
  
  productForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    quantity: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    categories: new FormArray([])
  });

  categories: Category[] = [];
  
  // Utilizado para carregar as categorias que já existem na tabela categories e verificar quais categorias do produto estão em category_product
  loadCategories() {
    const categoriesFormArray = this.productForm.get('categories') as FormArray;

    this.api.getCategories().subscribe((data: Category[]) => {
      this.categories = data;

      if(this.product) {
        this.categories.forEach(category => {
          const isSelected = this.product?.categories?.some(productCategory => productCategory.id === category.id) || false;
  
          categoriesFormArray.push(new FormControl(isSelected));
        })
      }
    });
  }

  // Carrega os valores do produto e dps as categorias
  loadProduct() {
    if(this.product) {
      this.productForm.patchValue({
          id: this.product.id,
          name: this.product.name,
          description: this.product.description,
          quantity: this.product.quantity,
          price: this.product.price
      });
    }

    this.loadCategories();
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value as Product);
    }
    else {
      this.productForm.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.loadProduct();
  }
}
