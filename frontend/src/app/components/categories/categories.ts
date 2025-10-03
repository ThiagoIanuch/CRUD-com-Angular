import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { Category } from '../../interfaces/category';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css', '../products/products.css']
})
export class Categories {
  constructor(private api: Api) {}

  categories: Category[] = [];

  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
  });

  getCategories() {
    this.api.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    })
  }

  deleteCategory(id: number) {
    this.api.deleteCategory(id).subscribe(() => {
      this.getCategories()  
      alert("Categoria deletada com sucesso");
    });
  }

  onSubmit() {
    if(this.categoryForm.valid) {
      const newCategory = this.categoryForm.value;

      this.api.addCategory(newCategory).subscribe(() => {
        alert('Categoria adicionada com sucesso!');
        this.categoryForm.reset();
        this.getCategories();
      });
    }
  }

  ngOnInit() {
    this.getCategories();
  }
}
