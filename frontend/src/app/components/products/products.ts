import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { ProductModal } from '../product-modal/product-modal';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductModal],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  constructor(private api: Api) {}

  products: Product[] = [];
  selectedProduct: any;
  showModal: boolean = false;

  // Obter todos os produtos
  getProducts() {
    this.api.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  // Deletar produto específico
  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe(() => {
      this.getProducts()  
      alert("Produto deletado com sucesso");
    });
  }

  // Controlar a visualização do painel modal
  openModal(product?: Product) {
    this.selectedProduct = { ...product};
    this.showModal = true;
  }

  // Verificar se o modal é para adicionar ou editar produto e então fazer a requisição para a API
  submitModal(product: Product) {
    if (product.id) {
      this.api.updateProduct(product).subscribe(() => {
        this.getProducts();
        this.showModal = false;
        alert("Produto editado com sucesso");
      });
    } else {
      this.api.addProduct(product).subscribe(() => {
        this.getProducts();
        this.showModal = false;
        alert("Produto adicionado com sucesso");
      });
    }
  }

  // Listar todos os produtos ao carregar a página
  ngOnInit() {
    this.getProducts();
  }
}
