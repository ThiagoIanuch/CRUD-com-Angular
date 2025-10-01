import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { ProductModal } from '../../product-modal/product-modal';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductModal],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  constructor(private api: Api) {}

  products: any[] = [];
  selectedProduct: any;
  showModal: boolean = false;

  // Obter todos os produtos
  getProducts() {
    this.api.getProducts().subscribe(data => {
      this.products = data as any[];
    })
  }

  // Deletar produto específico
  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe(() => this.getProducts());
  }

  // Controlar a visualização do painel modal
  openModal(product?: any) {
    this.selectedProduct = { ...product};
    this.showModal = true;
  }

  // Verificar se o modal é para adicionar ou editar produto e então fazer a requisição para a API
  submitModal(product?: any) {
    if(product.id) {
      this.api.updateProduct(product).subscribe(() => {
        this.getProducts();
        this.showModal = false;
      })
    }
    else {
      this.api.addProduct(product).subscribe(() => {
        this.getProducts() 
        this.showModal = false;
      });
    }
  }

  // Listar todos os produtos ao carregar a página
  ngOnInit() {
    this.getProducts();
  }
}
